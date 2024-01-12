import AboutCourse from "@/components/AboutCourse";
import TrackAuthor from "@/components/TrackAuthor";

interface TracksLayoutProps {
  children: React.ReactNode;
  trackTitle: string;
  trackDescription: string;
  trackAuthor: string;
  trackAuthorDescription: string;
  trackAuthorTwitter: string;
  tags: string[];
}

export default function TracksLayout({
  children,
  trackTitle,
  trackDescription,
  trackAuthor,
  trackAuthorDescription,
  trackAuthorTwitter,
  tags,
}: TracksLayoutProps) {
  return (
    <main className="pt-24 text-white lg:pt-32">
      <section className="text-center">
        <h1 className="font-future text-3xl lg:text-8xl">{trackTitle}</h1>
        <div className="mt-7 border border-white lg:ml-16 lg:h-px lg:w-[90%]"></div>
      </section>
      <div className="flex flex-col justify-start lg:pt-24">
        <div className="">
          <AboutCourse lessonDescription={trackDescription} tags={tags} />
        </div>
        <div className="text-left ">
          <TrackAuthor
            author={trackAuthor}
            authorDescription={trackAuthorDescription}
            authorTwitter={trackAuthorTwitter}
          />
        </div>
      </div>
      <div className="font-clash-display font-medium tracking-wider lg:px-36 lg:pt-16 lg:text-xl	">
        {children}
      </div>
    </main>
  );
}
