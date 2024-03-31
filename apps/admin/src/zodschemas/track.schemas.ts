import { z } from "zod";

export const trackCreateSchema = z.object({
  trackName: z.string().min(3).max(20),
  trackTitle: z.string().min(3).max(20),
  // authors: z.array(z.string().min(3).max(20)),
  imgPath: z.string().min(3).max(20),
  trackDescription: z.string().min(3).max(200),
  trackPath: z.string().min(3).max(20),
  // order: z.number().min(1).max(10),
});

export const trackEditSchema = z.object({
  trackName: z.string().min(3).max(20),
  trackTitle: z.string().min(3).max(20),
  // authors: z.array(z.string().min(3).max(20)),
  imgPath: z.string().min(3).max(20),
  trackDescription: z.string().min(3).max(200),
  trackPath: z.string().min(3).max(20),
  // order: z.number().min(1).max(10),
});
