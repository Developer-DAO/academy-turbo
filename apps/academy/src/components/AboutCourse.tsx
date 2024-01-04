interface AboutCourseProps {
  lessonDescription: string;
}

export default function AboutCourse({ lessonDescription }: AboutCourseProps) {
  return (
    <article className="px-7 pt-14 lg:ml-16 lg:w-[42rem] lg:p-0 ">
      <h2 className="text-2xl font-bold lg:text-3xl">About This Course</h2>
      <p className="mt-4 leading-tight tracking-wide lg:text-xl">{lessonDescription}</p>
    </article>
  );
}
