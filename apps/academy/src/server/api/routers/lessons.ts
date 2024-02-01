/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const lessonsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const lessons = await ctx.prisma.lessons.findMany();
    return lessons;
  }),
  getLessonsByTrackPath: publicProcedure
    .input(z.object({ trackPath: z.string() }))
    .query(async ({ input, ctx }) => {
      const track = await ctx.prisma.tracks.findMany({
        where: {
          trackPath: {
            equals: input.trackPath,
          },
        },
      });

      // if (track === undefined) {
      //   return Error("track not found");
      // }

      const trackLessons = await ctx.prisma.lessons.findMany({
        where: {
          trackId: {
            equals: track[0]!.id,
          },
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      });

      return trackLessons;
    }),
});
