import { z } from "zod";

export const tagCreateSchema = z.object({
  tagName: z.string().min(3).max(20),
  tagDescription: z.string().min(3).max(200),
});

export const tagEditSchema = z.object({
  tagName: z.string().min(3).max(20),
  tagDescription: z.string().min(3).max(200),
});
