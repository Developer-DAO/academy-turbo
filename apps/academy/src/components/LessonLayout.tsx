// import AboutCourse from "@/components/AboutCourse";
import CreatedBy from "@/components/CreatedBy";

interface LessonLayoutProps {
  children: React.ReactNode;
  lessonTitle: string;
}

export default function LessonLayout({ children, lessonTitle }: LessonLayoutProps) {
  return (
    <main className="pt-32 text-white">
      <section className="text-center">
        <h1 className="font-future text-3xl lg:text-8xl">{lessonTitle}</h1>
        <div className="ml-16 mt-7 h-px w-72 border border-white lg:w-[90%]"></div>
      </section>
      <div className="flex-col justify-start lg:pt-24">
        {/* <div className="">
          <AboutCourse lessonDescription={lessonDescription} />
        </div> */}
        <div className="text-left ">
          <CreatedBy
            author="wolovim"
            authorPosition="Ethereum Foundation"
            authorTwitter="@wolovim.eth"
            createdDate="August 15, 2023"
          />
        </div>
      </div>
      <div className="font-clash-display px-36 pt-16 text-xl font-medium tracking-wider	">
        {children}
      </div>
    </main>
  );
}
