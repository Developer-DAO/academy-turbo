import AboutCourse from "@/components/AboutCourse";
import CreatedBy from "@/components/CreatedBy";

export default function LessonLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pt-32 text-white">
      <section className="text-center">
        <h1 className="font-future text-3xl lg:text-8xl">
          WTRO TO <br /> ETHEREUM
        </h1>
        <div className="ml-16 mt-7 h-px w-72 border border-white lg:w-[90%]"></div>
      </section>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:pt-24">
        <div className="order-first lg:order-last">
          <CreatedBy />
        </div>
        <div className="order-last lg:order-first">
          <AboutCourse />
        </div>
      </div>
      {children}
    </main>
  );
}
