// Imports
// ========================================================
import { prisma } from "database";
import type { GetServerSidePropsContext } from "next";
import type { Session } from "next-auth";
import { type DefaultSession, getServerSession, type NextAuthOptions } from "next-auth";
// SIWE Integration
import type { CtxOrReq } from "next-auth/client/_utils";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

import { env } from "@/env.mjs";

// Types
// ========================================================
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      image: string;
      verificationNumber: number;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

// Auth Options
// ========================================================
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: (ctxReq: CtxOrReq) => NextAuthOptions = ({
  req,
}: {
  req?: CtxOrReq["req"];
}) => ({
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      } as Session & { user: { id: string } };
    },
  },
  session: { strategy: "jwt" },
  secret: env.NEXTAUTH_SECRET != undefined ? env.NEXTAUTH_SECRET : "", // in case you want pass this along for other functionality
  // adapter: PrismaAdapter(prisma), // Not meant for type 'credentials' (used for db sessions)
  // debug: true, // For debugging
  providers: [
    CredentialsProvider({
      // ! Don't add this
      // - it will assume more than one auth provider
      // - and redirect to a sign-in page meant for oauth
      // - id: 'siwe',
      name: "Ethereum",
      type: "credentials", // default for Credentials
      // Default values if it was a form
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      authorize: async (credentials) => {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message ?? "{}") as Partial<SiweMessage>,
          );

          // if (req?.headers === undefined) throw new Error("No headers");

          const nonce = await getCsrfToken({ req: { headers: req?.headers || {} } });

          if (nonce === undefined) throw new Error("No nonce");

          const verified = await siwe.verify({
            signature: credentials?.signature !== undefined ? credentials.signature : "",
            nonce,
          });

          if (!verified.success) {
            throw new Error("Verification failed");
          }

          const { data: fields } = verified;

          // Check if user exists
          let user = await prisma.user.findUnique({
            where: {
              address: fields.address,
            },
          });

          // Create new user if doesn't exist
          if (!user) {
            user = await prisma.user.create({
              data: {
                address: fields.address,
                image: "https://www.developerdao.com/D_D_logo-dark.svg",
                verificationNumber: Math.floor(100000 + Math.random() * 900000),
              },
            });

            // if new then create account
            await prisma.account.create({
              data: {
                userId: user.id,
                type: "credentials",
                provider: "Ethereum",
                providerAccountId: fields.address,
              },
            });
          } else {
            if (user.verificationNumber === null) {
              await prisma.user.update({
                where: {
                  id: user.id,
                },
                data: {
                  verificationNumber: Math.floor(100000 + Math.random() * 900000),
                },
              });
            }
          }
          const { verificationNumber: _verificationNumber, ...restUser } = user;

          return {
            ...restUser,
          };
        } catch (error) {
          // Uncomment or add logging if needed
          console.error({ error });
          return null;
        }
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
});

// Auth Session
// ========================================================
/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  // Changed from authOptions to authOption(ctx)
  // This allows use to retrieve the csrf token to verify as the nonce
  return getServerSession(ctx.req, ctx.res, authOptions(ctx));
};
