/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const TagsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.tags.findMany();
  }),
  getTagById: protectedProcedure
    .input(
      z.object({
        tagId: z.string().min(3).max(30),
      }),
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.tags.findUnique({
        where: {
          id: input.tagId,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        tagName: z.string().min(3).max(30),
        tagDescription: z.string().min(3).max(200),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.tags.create({
        data: {
          ...input,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ tagId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.tags.delete({
        where: {
          id: input.tagId,
        },
      });
    }),
  udpate: protectedProcedure
    .input(
      z.object({
        tagId: z.string().min(3).max(30),
        tagName: z.string().min(3).max(30),
        tagDescription: z.string().min(3).max(200),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { tagId, ...restData } = input;
      return await ctx.prisma.tags.update({
        where: {
          id: tagId,
        },
        data: {
          ...restData,
        },
      });
    }),
});
