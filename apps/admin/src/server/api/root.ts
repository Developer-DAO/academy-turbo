import { completedQuizzesRouter } from "@/server/api/routers/completedquizzes";
import { lessonsRouter } from "@/server/api/routers/lessons";
import { TagsRouter } from "@/server/api/routers/tags";
import { TracksRouter } from "@/server/api/routers/tracks";
import { createTRPCRouter } from "@/server/api/trpc";
// export * from "database";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tracks: TracksRouter,
  lessons: lessonsRouter,
  completedQuizzes: completedQuizzesRouter,
  tags: TagsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
