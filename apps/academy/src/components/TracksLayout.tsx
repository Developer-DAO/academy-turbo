import AboutCourse from "@/components/AboutCourse";
import TrackAuthor from "@/components/TrackAuthor";

interface TracksLayoutProps {
  children: React.ReactNode;
  trackTitle: string;
  trackDescription: string;
  trackAuthor: string;
  trackAuthorDescription: string;
  trackAuthorTwitter: string;
}

export default function TracksLayout({
  children,
  trackTitle,
  trackDescription,
  trackAuthor,
  trackAuthorDescription,
  trackAuthorTwitter,
}: TracksLayoutProps) {
  return (
    <main className="pt-32 text-white">
      <section className="text-center">
        <h1 className="font-future text-3xl lg:text-8xl">{trackTitle}</h1>
        <div className="ml-16 mt-7 h-px w-72 border border-white lg:w-[90%]"></div>
      </section>
      <div className="flex-col justify-start lg:pt-24">
        <div className="">
          <AboutCourse lessonDescription={trackDescription} />
        </div>
        <div className="text-left ">
          <TrackAuthor
            author={trackAuthor}
            authorDescription={trackAuthorDescription}
            authorTwitter={trackAuthorTwitter}
          />
        </div>
      </div>
      <div className="font-clash-display px-36 pt-16 text-xl font-medium tracking-wider	">
        {children}
      </div>
    </main>
  );
}
