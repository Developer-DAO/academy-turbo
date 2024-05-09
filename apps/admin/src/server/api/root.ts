import { completedQuizzesRouter } from "@/server/api/routers/completedquizzes";
import { contributorsRouter } from "@/server/api/routers/contributors";
import { contributorsOnLessonsRouter } from "@/server/api/routers/contributorsOnLessons";
import { contributorsOnTracksRouter } from "@/server/api/routers/contributorsOnTracks";
import { lessonsRouter } from "@/server/api/routers/lessons";
import { TagsRouter } from "@/server/api/routers/tags";
import { tagsOnLessonsRouter } from "@/server/api/routers/tagsOnLessons";
import { tracksRouter } from "@/server/api/routers/tracks";
import { createTRPCRouter } from "@/server/api/trpc";
// export * from "database";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tracks: tracksRouter,
  lessons: lessonsRouter,
  completedQuizzes: completedQuizzesRouter,
  tags: TagsRouter,
  contributors: contributorsRouter,
  contributorsOnLessons: contributorsOnLessonsRouter,
  contributorsOnTracks: contributorsOnTracksRouter,
  tagsOnLessons: tagsOnLessonsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
