import { Avatar, AvatarImage } from "ui/components/ui/avatar";

interface CreatedByProps {
  author: string;
  authorImage: string;
  authorTwitter: string;
}

export default function CreatedBy({
  author,
  authorImage = "/authors/default.png",
  authorTwitter,
}: CreatedByProps) {
  // mvp: if multiple authors, split by comma and map to multiple links
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
    <section className="grid place-items-start pt-6 text-sm lg:text-xl">
      <div className="flex w-full">
        <p className="text-left">Created by:</p>
        <Avatar className="ml-6 h-16 w-16">
          <AvatarImage src={authorImage} />
        </Avatar>
        <div className="ml-6 flex flex-col items-center lg:flex-row lg:items-start lg:gap-4">
          <article className="font-light">
            <p className="font-bold">{author}</p>
            {twitterLinks}
          </article>
        </div>
      </div>
    </section>
  );
}
