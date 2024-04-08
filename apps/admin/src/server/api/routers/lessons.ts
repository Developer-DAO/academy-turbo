/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================
import { z } from "zod";

import { env } from "@/env.mjs";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const lessonsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        quizFileName: z.string().min(1),
        lessonTitle: z.string().min(1),
        // authors: z.string().min(1),
        imgPath: z.string().min(1),
        lessonDescription: z.string().min(1),
        lessonPath: z.string().min(1),
        trackId: z.string().min(1),
        // productionVisible: z.boolean(),
        // stagingVisible: z.boolean(),
        // visible: z.boolean(),
        // nextLessonPath: z.string().optional(),
        // order: z.number().min(1).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.lessons.create({
        data: {
          ...input,
        },
      });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
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
      include: {
        track: true,
      },
    });
    return lessons;
  }),
  udpate: protectedProcedure
    .input(
      z.object({
        lessonId: z.string().min(3).max(30),
        quizFileName: z.string().min(1),
        lessonTitle: z.string().min(1),
        // authors: z.string().min(1),
        imgPath: z.string().min(1),
        lessonDescription: z.string().min(1),
        lessonPath: z.string().min(1),
        trackId: z.string().min(1),
        // productionVisible: z.boolean(),
        // stagingVisible: z.boolean(),
        // visible: z.boolean(),
        // nextLessonPath: z.string().optional(),
        // order: z.number().min(1).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { lessonId, ...restData } = input;
      return await ctx.prisma.lessons.update({
        where: {
          id: lessonId,
        },
        data: { ...restData },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.lessons.delete({
        where: {
          id: input.lessonId,
        },
      });
    }),
  getLessonsById: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .query(async ({ input, ctx }) => {
      const constructedWhere =
        env.ENVIRONMENT === "production"
          ? { productionVisible: true }
          : env.ENVIRONMENT === "staging"
          ? { stagingVisible: true }
          : { visible: true };
      return await ctx.prisma.lessons.findUnique({
        where: {
          id: input.lessonId,
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
          contributions: {
            include: {
              contributions: {
                include: {
                  contributor: true,
                },
              },
            },
          },
        },
      });
    }),
  getLessonsByTrackPath: protectedProcedure
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
  getLessonsByLessonPath: protectedProcedure.query(async ({ ctx }) => {
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
  getLessonsByTrackId: protectedProcedure
    .input(z.object({ trackId: z.string() }))
    .query(async ({ input, ctx }) => {
      const constructedWhere =
        env.ENVIRONMENT === "production"
          ? { productionVisible: true }
          : env.ENVIRONMENT === "staging"
          ? { stagingVisible: true }
          : { visible: true };
      const trackLessons = await ctx.prisma.lessons.findMany({
        where: {
          trackId: {
            equals: input.trackId,
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
          track: true,
        },
        orderBy: {
          order: "asc",
        },
      });

      return trackLessons;
    }),
});
