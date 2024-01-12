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
    <section className="mx-6 grid place-items-start pt-3 text-sm lg:mx-16 lg:pt-6 lg:text-xl">
      <p className="pl-2 text-left">Created by:</p>
      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-4">
        <Avatar className="h-10 w-10 lg:mt-7 lg:h-16 lg:w-16">
          <AvatarImage src="/azuki.png" />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
        <article className="mb-4 mt-2 gap-2 font-light lg:mt-7">
          <p>{author}</p>
          <p>{authorDescription}</p>
          <p>Twitter {authorTwitter}</p>
        </article>
      </div>
      {/* <div className="mt-4">
        <div className="mr-2 inline-flex h-8 w-14 items-center justify-center gap-2 rounded-3xl border border-neutral-600 border-opacity-30 bg-yellow-400 bg-opacity-40 p-2 backdrop-blur-md">
          <div className="font-['Clash Display'] text-center text-sm font-semibold text-white">
            Web3
          </div>
        </div>
        <div className="mr-2 inline-flex h-8 w-14 items-center justify-center gap-2 rounded-3xl border border-neutral-600 border-opacity-30 bg-red-600 bg-opacity-30 p-2 backdrop-blur-md">
          <div className="font-['Clash Display'] text-center text-sm font-semibold text-white">
            Eth
          </div>
        </div>
        <div className="inline-flex h-8 w-20 items-center justify-center gap-2 rounded-3xl border border-neutral-600 border-opacity-30 bg-cyan-400 bg-opacity-30 p-2 backdrop-blur-md">
          <div className="font-['Clash Display'] text-center text-sm font-semibold text-white">
            Beginner
          </div>
        </div>
      </div> */}
    </section>
  );
}
