import AboutCourse from "@/components/AboutCourse";
import CreatedBy from "@/components/CreatedBy";
import Topic from "@/components/Topic";

export default function TrackDetails() {
  return (
    <main className="pt-14 text-white">
      <section className="text-center">
        <h1 className="font-future text-3xl">
          WTRO TO <br /> ETHEREUM
        </h1>
        <div className="ml-16 mt-7 h-px w-72 border border-white"></div>
      </section>
      <CreatedBy />
      <AboutCourse />
      <Topic />
      <Topic />
    </main>
  );
}
