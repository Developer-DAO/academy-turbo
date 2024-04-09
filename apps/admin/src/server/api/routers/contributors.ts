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
  getAllAvailableByLessonId: protectedProcedure
    .input(
      z.object({
        lessonId: z.string().min(1),
      }),
    )
    .query(async ({ input, ctx }) => {
      const contributorsOnThisLesson = await ctx.prisma.contributorsOnLessons.findMany({
        where: {
          lessonId: input.lessonId,
        },
      });
      const contributorsIds = contributorsOnThisLesson.map(
        (contribution) => contribution.contributorId,
      );
      console.log({ contributorsIds });
      const asd = await ctx.prisma.contributors.findMany({
        where: {
          id: { notIn: contributorsIds },
        },
      });
      console.log({ asd });
      return asd;
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
