/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================
import { z } from "zod";

import { env } from "@/env.mjs";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const lessonsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const constructedWhere =
      env.ENVIRONMENT === "production"
        ? { productionVisible: true }
        : env.ENVIRONMENT === "staging"
        ? { stagingVisible: true }
        : { visible: true };
    const lessons = await ctx.prisma.lessons.findMany({
      where: {
        ...constructedWhere,
      },
    });
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
      const constructedWhere =
        env.ENVIRONMENT === "production"
          ? { productionVisible: true }
          : env.ENVIRONMENT === "staging"
          ? { stagingVisible: true }
          : { visible: true };
      const trackLessons = await ctx.prisma.lessons.findMany({
        where: {
          trackId: {
            equals: track[0]!.id,
          },
          AND: {
            ...constructedWhere,
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
  getLessonsByLessonPath: publicProcedure.query(async ({ ctx }) => {
    const constructedWhere =
      env.ENVIRONMENT === "production"
        ? { productionVisible: true }
        : env.ENVIRONMENT === "staging"
        ? { stagingVisible: true }
        : { visible: true };
    const trackLessons = await ctx.prisma.lessons.findMany({
      where: {
        lessonPath: {
          startsWith: "/fundamentals/",
        },
        AND: {
          ...constructedWhere,
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
