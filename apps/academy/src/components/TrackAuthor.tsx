import { Avatar, AvatarFallback, AvatarImage } from "ui/components/ui/avatar";

interface TrackAuthorProps {
  author: string;
  authorDescription: string;
  authorTwitter: string;
}

export default function TrackAuthor({
  author,
  authorDescription,
  authorTwitter,
}: TrackAuthorProps) {
  return (
    <div className="w-full px-7 pt-14 lg:w-full lg:p-0">
      <section className="grid place-items-start pt-3 text-sm lg:pt-6 lg:text-xl">
        <p className="text-left">Created by:</p>
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-4">
          <Avatar className="h-10 w-10 lg:mt-7 lg:h-16 lg:w-16">
            <AvatarImage src="/azuki.png" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <article className="mb-4 mt-2 gap-2 font-light lg:mt-7">
            <p className="font-bold">{author}</p>
            <p>{authorDescription}</p>
            <a
              className="underline"
              href={`https://x.com/${authorTwitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{authorTwitter}
            </a>
          </article>
        </div>
      </section>
    </div>
  );
}
