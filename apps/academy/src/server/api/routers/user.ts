// Imports
// ========================================================

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const userRouter = createTRPCRouter({
  getUserEmail: protectedProcedure.query(async ({ ctx }) => {
    const userEmail = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        email: true,
        emailVerified: true,
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
      },
    });
    return emailSaved;
  }),
});
