/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const contributorsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.contributors.findMany();
  }),
});
