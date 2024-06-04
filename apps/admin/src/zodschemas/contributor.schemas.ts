import { z } from "zod";

export const contributorCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  position: z.string().min(1),
  twitter: z.string().min(1),
});

export const contributorEditSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  position: z.string().min(1),
  twitter: z.string().min(1),
  contributorId: z.string().min(1),
});
