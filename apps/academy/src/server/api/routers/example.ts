// Imports
// ========================================================
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
