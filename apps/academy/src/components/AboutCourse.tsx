interface AboutCourseProps {
  lessonDescription: string;
}

export default function AboutCourse({ lessonDescription }: AboutCourseProps) {
  return (
    <article className="px-7 pt-14 lg:ml-16 lg:w-[42rem] lg:p-0 ">
      <h2 className="text-2xl font-bold lg:text-3xl">About This Course</h2>
      <div className="mt-4">
        <div className="mr-2 inline-flex h-8 w-14 items-center justify-center gap-2 rounded-3xl border border-neutral-600 border-opacity-30 bg-yellow-400 bg-opacity-40 p-2 backdrop-blur-md">
          <div className="font-['Clash Display'] text-center text-sm font-semibold text-white">
            Web3
          </div>
        </div>
        <div className="mr-2 inline-flex h-8 w-14 items-center justify-center gap-2 rounded-3xl border border-neutral-600 border-opacity-30 bg-red-600 bg-opacity-30 p-2 backdrop-blur-md">
          <div className="font-['Clash Display'] text-center text-sm font-semibold text-white">
            Eth
          </div>
        </div>
        <div className="inline-flex h-8 w-20 items-center justify-center gap-2 rounded-3xl border border-neutral-600 border-opacity-30 bg-cyan-400 bg-opacity-30 p-2 backdrop-blur-md">
          <div className="font-['Clash Display'] text-center text-sm font-semibold text-white">
            Beginner
          </div>
        </div>
      </div>
      <p className="mt-4 leading-tight tracking-wide lg:text-xl">{lessonDescription}</p>
    </article>
  );
}
