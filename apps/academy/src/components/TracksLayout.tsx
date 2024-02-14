import AboutCourse from "@/components/AboutCourse";
import TrackAuthor from "@/components/TrackAuthor";

interface TracksLayoutProps {
  children: React.ReactNode;
  trackTitle: string;
  trackDescription: string;
  trackAuthor: string;
  trackAuthorImage: string;
  trackAuthorDescription: string;
  trackAuthorTwitter: string;
  tags: string[];
}

export default function TracksLayout({
  children,
  trackTitle,
  trackDescription,
  trackAuthor,
  trackAuthorImage,
  trackAuthorDescription,
  trackAuthorTwitter,
  tags,
}: TracksLayoutProps) {
  return (
    <main className="pt-24 text-white">
      <section className="text-center">
        <h1 className="font-future text-3xl lg:text-6xl">{trackTitle}</h1>
        <div className="mt-7 border border-white lg:ml-16 lg:h-px lg:w-[90%]"></div>
      </section>
      <div className="flex flex-col justify-start lg:pt-24">
        <div className="w-full">
          <AboutCourse lessonDescription={trackDescription} tags={tags} />
        </div>
        <div className="w-full">
          <TrackAuthor
            author={trackAuthor}
            authorImage={trackAuthorImage}
            authorDescription={trackAuthorDescription}
            authorTwitter={trackAuthorTwitter}
          />
        </div>
      </div>
      <div className="font-clash-display min-h-[50rem] font-medium tracking-wider lg:pt-16 lg:text-xl">
        {children}
      </div>
    </main>
  );
}
