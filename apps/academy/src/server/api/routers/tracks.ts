/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const TracksRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const tracks = await ctx.prisma.tracks.findMany({
      include: {
        tags: true,
        lessons: false,
      },
    });
    return tracks;
  }),
});
