import { completedQuizzesRouter } from "@/server/api/routers/completedquizzes";
import { lessonsRouter } from "@/server/api/routers/lessons";
import { createTRPCRouter } from "@/server/api/trpc";
// export * from "database";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  lessons: lessonsRouter,
  completedQuizzes: completedQuizzesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
