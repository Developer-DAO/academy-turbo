import { z } from "zod";

export const lessonCreateSchema = z.object({
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
});

export const lessonEditSchema = z.object({
  quizFileName: z.string().min(1),
  lessonTitle: z.string().min(1),
  // authors: z.string().min(1),
  imgPath: z.string().min(1),
  lessonDescription: z.string().min(1),
  lessonPath: z.string().min(1),
  trackId: z.string().min(1),
  contributorId: z.string().min(1),
  // productionVisible: z.boolean(),
  // stagingVisible: z.boolean(),
  // visible: z.boolean(),
  // nextLessonPath: z.string().optional(),
  // order: z.number().min(1).optional(),
});
