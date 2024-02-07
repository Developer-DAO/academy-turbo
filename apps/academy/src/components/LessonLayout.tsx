// import AboutCourse from "@/components/AboutCourse";
import CreatedBy from "@/components/CreatedBy";

interface LessonLayoutProps {
  children: React.ReactNode;
  lessonTitle: string;
  author: string;
  authorPosition: string;
  authorTwitter: string;
  createdDate: string;
}

export default function LessonLayout({
  children,
  lessonTitle,
  author,
  authorTwitter,
}: LessonLayoutProps) {
  return (
    <main className="px-10 pt-36 text-white lg:mx-auto lg:max-w-screen-lg lg:pt-44">
      <section className="text-center">
        <h1 className="font-future text-3xl lg:text-6xl">{lessonTitle}</h1>
      </section>
      <CreatedBy author={author} authorTwitter={authorTwitter} />
      <div className="font-poppins pt-4 text-xl font-medium tracking-wider lg:mx-auto lg:max-w-screen-lg">
        {children}
      </div>
    </main>
  );
}
