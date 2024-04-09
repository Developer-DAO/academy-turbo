/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const contributorsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.contributors.findMany();
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        image: z.string().min(1),
        position: z.string().min(1),
        twitter: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.contributors.create({
        data: {
          ...input,
        },
      });
    }),
});
