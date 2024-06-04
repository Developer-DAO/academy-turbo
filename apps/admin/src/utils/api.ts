import { httpBatchLink, loggerLink } from "@trpc/client";
import { type CreateTRPCNext, createTRPCNext } from "@trpc/next";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { NextPageContext } from "next";

import type { AppRouter } from "@/server/api/root";
import { transformer } from "@/server/transformer";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env["VERCEL_URL"] != undefined) return `https://${process.env["VERCEL_URL"]}`; // SSR should use vercel url

  return `http://localhost:3000`; // dev SSR should use localhost
};

export const api: CreateTRPCNext<AppRouter, NextPageContext, DecoratorContext> =
  createTRPCNext<AppRouter>({
    config() {
      return {
        queryClientConfig: {
          defaultOptions: {
            queries: {
              refetchOnMount: false,
              refetchOnWindowFocus: false,
            },
          },
        },
        transformer,
        links: [
          loggerLink({
            enabled: (opts) =>
              process.env.NODE_ENV === "development" ||
              (opts.direction === "down" && opts.result instanceof Error),
          }),
          httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
          }),
        ],
      };
    },
    ssr: false,
  });

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
