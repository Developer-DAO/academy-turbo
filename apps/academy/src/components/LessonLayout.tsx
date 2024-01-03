import AboutCourse from "@/components/AboutCourse";
import CreatedBy from "@/components/CreatedBy";

interface LessonLayoutProps {
  children: React.ReactNode;
  lessonTitle: string;
  lessonDescription: string;
}

export default function LessonLayout({
  children,
  lessonTitle,
  lessonDescription,
}: LessonLayoutProps) {
  return (
    <main className="pt-32 text-white">
      <section className="text-center">
        <h1 className="font-future text-3xl lg:text-8xl">{lessonTitle}</h1>
        <div className="ml-16 mt-7 h-px w-72 border border-white lg:w-[90%]"></div>
      </section>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:pt-24">
        <div className="order-first lg:order-last">
          <CreatedBy />
        </div>
        <div className="order-last lg:order-first">
          <AboutCourse lessonDescription={lessonDescription} />
        </div>
      </div>
      <div className="px-20">{children}</div>
    </main>
  );
}
