/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const tagsOnLessonsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        tagId: z.string().min(1),
        lessonId: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.tagsOnLessons.create({
        data: {
          ...input,
        },
      });
    }),
});
