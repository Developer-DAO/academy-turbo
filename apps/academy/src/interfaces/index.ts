export interface Lesson {
  frontMatter: any;
  slug: string;
  path: string;
  completed?: boolean;
}
export interface Lessons {
  lessons: {
    frontMatter: any;
    slug: string;
  }[];
}

export interface FormatedLessonInterface {
  projects: Project[];
  fundamentals: Fundamental[];
}

export interface Fundamental {
  path: Path;
  frontMatter: FundamentalFrontMatter;
  slug: string;
}

export interface FundamentalFrontMatter {
  title: string;
  description: string;
  icons: string[];
  authors?: string[];
  i18n?: string;
  author?: string[] | string;
}

export enum Path {
  Fundamentals = "fundamentals",
}

export interface Project {
  path: string;
  frontMatter: ProjectFrontMatter;
  slug: string;
  completed?: boolean;
}

export interface EthIntro {
  path: string;
  frontMatter: ProjectFrontMatter;
  slug: string;
  completed?: boolean;
}

export interface ProjectFrontMatter {
  title: string;
  description: string;
  icons: string[];
  i18n?: string;
  author?: string;
}

export interface CompletedQuizRecord {
  id: string;
  lessonId: string;
  userId: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Track {
  id: string;
  trackName: string;
  trackTitle: string;
  authors: string[];
  imgPath: string;
  trackDescription: string;
  trackPath: string;
  order: number | null;
  productionVisible: boolean;
  stagingVisible: boolean;
  visible: boolean;
  tags?: {
    id: string;
    tagName: string;
    tagDescription: string;
  }[];
}

export type TrackWithTags = Track[];
