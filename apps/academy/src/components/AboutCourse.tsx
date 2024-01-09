interface AboutCourseProps {
  lessonDescription: string;
  tags: string[];
}

export default function AboutCourse({ lessonDescription, tags }: AboutCourseProps) {
  return (
    <article className="px-7 pt-14 lg:ml-16 lg:w-[42rem] lg:p-0 ">
      <h2 className="text-2xl font-bold lg:text-3xl">About This Course</h2>
      <div className="mt-4">
        {tags.map((tag, idx) => (
          <div
            key={idx}
            className={`mr-2 inline-flex h-8 w-20 items-center justify-center gap-2 rounded-3xl border border-neutral-600 border-opacity-30 ${
              idx % 3 === 0 ? "bg-[#FF0000]" : idx % 2 === 0 ? "bg-[#FAFF00]" : "bg-[#00F0FF]"
            } bg-opacity-40 p-2 backdrop-blur-md`}
          >
            <div className="font-['Clash Display'] p-4 text-center text-sm font-semibold text-white">
              {tag}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 leading-tight tracking-wide lg:text-xl">{lessonDescription}</p>
    </article>
  );
}
