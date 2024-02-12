/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================
import { env } from "@/env.mjs";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const TracksRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const constructedWhere =
      env.ENVIRONMENT === "production"
        ? { productionVisible: true }
        : env.ENVIRONMENT === "staging"
        ? { stagingVisible: true }
        : { visible: true };
    const tracks = await ctx.prisma.tracks.findMany({
      where: {
        ...constructedWhere,
      },
      include: {
        tags: {
          include: {
            tag: {
              include: {
                tracks: false,
              },
            },
          },
        },
        lessons: false,
      },
      orderBy: {
        order: "asc",
      },
    });
    return tracks;
  }),
});
