/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const accountsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const accounts = await ctx.prisma.account.findMany({});
    return accounts;
  }),
});
