import { Avatar, AvatarImage } from "ui/components/ui/avatar";

interface TrackAuthorProps {
  author: string;
  authorImage: string;
  authorDescription: string;
  authorTwitter: string;
}

export default function TrackAuthor({
  author,
  authorImage = "/authors/default.png",
  authorDescription,
  authorTwitter,
}: TrackAuthorProps) {
  // mvp: if multiple authors, split by comma and map to multiple links
  console.log("∆∆∆: ");
  console.log(authorImage);
  const handles = authorTwitter.split(", ");
  const twitterLinks = handles.map((handle, idx) => (
    <a
      key={idx}
      className="pr-2 underline"
      href={`https://x.com/${handle}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      @{handle}
    </a>
  ));

  return (
    <div className="w-full px-7 pt-14 lg:w-full lg:p-0">
      <section className="grid place-items-start pt-3 text-sm lg:pt-6 lg:text-xl">
        <p className="text-left">Created by:</p>
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-4">
          <Avatar className="h-10 w-10 lg:mt-7 lg:h-16 lg:w-16">
            <AvatarImage src={authorImage} />
          </Avatar>
          <article className="mb-4 mt-2 gap-2 font-light lg:mt-7">
            <p className="font-bold">{author}</p>
            <p>{authorDescription}</p>
            {twitterLinks}
          </article>
        </div>
      </section>
    </div>
  );
}
