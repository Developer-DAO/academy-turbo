/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const contributorsOnLessonsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        typeOfContribution: z.string().min(1),
        contributorId: z.string().min(1),
        lessonId: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.contributorsOnLessons.create({
        data: {
          ...input,
        },
      });
    }),
});
