/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const TracksRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const tracks = await ctx.prisma.tracks.findMany({
      include: {
        tags: {
          include: {
            tag: true,
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
  getTrackById: protectedProcedure
    .input(
      z.object({
        trackId: z.string().min(3).max(30),
      }),
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.tracks.findUnique({
        where: {
          id: input.trackId,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        trackName: z.string().min(3).max(20),
        trackTitle: z.string().min(3).max(20),
        authors: z.array(z.string().min(3).max(20)),
        imgPath: z.string().min(3).max(20),
        trackDescription: z.string().min(3).max(20),
        trackPath: z.string().min(3).max(20),
        order: z.number().min(1).max(10),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.tracks.create({ data: { ...input } });
    }),
  delete: protectedProcedure
    .input(z.object({ trackId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.tracks.delete({
        where: {
          id: input.trackId,
        },
      });
    }),
  udpate: protectedProcedure
    .input(
      z.object({
        trackId: z.string().min(3),
        trackName: z.string().min(3).max(20),
        trackTitle: z.string().min(3).max(20),
        authors: z.array(z.string().min(3).max(20)),
        imgPath: z.string().min(3).max(20),
        trackDescription: z.string().min(3).max(20),
        trackPath: z.string().min(3).max(20),
        order: z.number().min(1).max(10),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { trackId, ...restData } = input;
      return await ctx.prisma.tracks.update({
        where: {
          id: trackId,
        },
        data: {
          ...restData,
        },
      });
    }),
});
