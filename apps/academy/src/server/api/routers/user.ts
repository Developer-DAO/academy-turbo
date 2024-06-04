// Imports
// ========================================================

import sgMail from "@sendgrid/mail";
import { z } from "zod";

import { env } from "@/env.mjs";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

sgMail.setApiKey(env.SENDGRID_API_KEY);

// Router
// ========================================================
export const userRouter = createTRPCRouter({
  getUserEmail: publicProcedure.input(z.string().min(1)).query(async ({ ctx, input }) => {
    const userEmail = await ctx.prisma.user.findUnique({
      where: {
        id: input,
      },
      select: {
        email: true,
        emailVerified: true,
        verificationNumber: true,
        emailSent: true,
      },
    });

    return {
      ...userEmail,
    };
  }),
  addEmail: protectedProcedure.input(z.string().email()).mutation(async ({ ctx, input }) => {
    const emailSaved = await ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        email: input,
        verificationNumber: Math.floor(100000 + Math.random() * 900000),
      },
    });

    async function sendEmail(msg: {
      to: string;
      from: string;
      subject: string;
      text: string;
      html: string;
    }) {
      return new Promise((resolve, reject) => {
        sgMail
          .send(msg)
          .then(async () => {
            console.log("Email sent successfully");
            const userEmailSent = await ctx.prisma.user.update({
              where: {
                id: ctx.session.user.id,
              },
              data: {
                emailSent: true,
              },
            });
            resolve(userEmailSent);
          })
          .catch((error: any) => {
            console.error(error);
            reject();
          });
      });
    }

    if (
      emailSaved !== null &&
      emailSaved.email !== null &&
      emailSaved.verificationNumber !== null
    ) {
      const msg = {
        to: emailSaved.email,
        from: "no-reply@developerdao.com",
        subject: "D_D Academy Verification Code",
        text: "This is your e-mail verification code for Developer DAO Academy ",
        html: `<strong>${emailSaved.verificationNumber}</strong>`,
      };

      await sendEmail(msg);

      return {
        ...emailSaved,
        emailSent: true,
      };
    } else {
      return {
        ...emailSaved,
        emailSent: false,
      };
    }
  }),
  emailVerificatedSuccess: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        emailVerified: new Date().toISOString(),
      },
    });
  }),
  resendCodeVerificationEmail: protectedProcedure
    .input(z.string().email())
    .mutation(async ({ ctx, input }) => {
      const userEmailData = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      async function sendEmail(msg: {
        to: string;
        from: string;
        subject: string;
        text: string;
        html: string;
      }) {
        return new Promise((resolve, reject) => {
          sgMail
            .send(msg)
            .then(async () => {
              console.log("Email sent successfully");
              const userEmailSent = await ctx.prisma.user.update({
                where: {
                  id: ctx.session.user.id,
                },
                data: {
                  emailSent: true,
                },
              });
              resolve(userEmailSent);
            })
            .catch((error: any) => {
              console.error(error);
              reject();
            });
        });
      }

      if (
        userEmailData !== null &&
        userEmailData.email !== null &&
        userEmailData.verificationNumber !== null
      ) {
        const msg = {
          to: input,
          from: "no-reply@developerdao.com",
          subject: "D_D Academy Verification Code",
          text: "This is your e-mail verification code for Developer DAO Academy ",
          html: `<strong>${userEmailData.verificationNumber}</strong>`,
        };

        await sendEmail(msg);
      }
    }),
});
