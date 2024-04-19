/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const contributorsOnTracksRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        typeOfContribution: z.string().min(1),
        contributorId: z.string().min(1),
        trackId: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.contributorsOnTracks.create({
        data: {
          ...input,
        },
      });
    }),
});
