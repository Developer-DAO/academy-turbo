interface LessonLayoutProps {
  children: React.ReactNode;
  lessonTitle: string;
  headerSection: React.ReactNode;
}

export default function LessonLayoutLite({
  children,
  lessonTitle,
  headerSection,
}: LessonLayoutProps) {
  return (
    <main className="px-10 pt-36 text-white lg:mx-auto lg:max-w-screen-lg lg:pt-44">
      <section className="text-center">
        <h1 className="font-future text-3xl lg:text-6xl">{lessonTitle}</h1>
      </section>
      {headerSection}
      <div className="font-poppins pt-4 text-xl font-medium tracking-wider lg:mx-auto lg:max-w-screen-lg">
        {children}
      </div>
    </main>
  );
}
