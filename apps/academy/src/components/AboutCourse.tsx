interface AboutCourseProps {
  lessonDescription: string;
  tags: string[];
}

export default function AboutCourse({ lessonDescription, tags }: AboutCourseProps) {
  return (
    <article className="w-full px-7 pt-14 lg:w-full lg:p-0">
      <h2 className="text-2xl font-bold lg:text-3xl">About This Track</h2>
      <div className="mt-4 flex flex-col gap-2 lg:flex-row">
        {tags.map((tag, idx) => (
          <div
            key={idx}
            className={`w-26 mr-2 inline-flex h-8 items-center justify-center gap-2 rounded-3xl border border-neutral-600 border-opacity-30 ${
              idx % 3 === 0 ? "bg-[#FF0000]" : idx % 2 === 0 ? "bg-[#FAFF00]" : "bg-[#00F0FF]"
            } bg-opacity-40 p-2 backdrop-blur-md`}
          >
            <div className="font-['Clash Display'] p-4 text-center text-xs font-semibold text-white lg:text-sm">
              {tag}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 leading-tight tracking-wide lg:text-xl">{lessonDescription}</p>
    </article>
  );
}
