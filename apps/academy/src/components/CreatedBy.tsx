import { Avatar, AvatarFallback, AvatarImage } from "ui/components/ui/avatar";

interface CreatedByProps {
  author: string;
  authorPosition: string;
  authorTwitter: string;
  createdDate: string;
}

export default function CreatedBy({ author, authorTwitter }: CreatedByProps) {
  return (
    <section className="grid place-items-start pt-6 text-sm lg:mx-16 lg:text-xl">
      <div className="flex w-full">
        <p className="text-left">Created by:</p>
        <Avatar className="ml-6 h-16 w-16">
          <AvatarImage src="/azuki.png" />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
        <div className="ml-6 flex flex-col items-center lg:flex-row lg:items-start lg:gap-4">
          <article className="font-light">
            <p className="font-bold">{author}</p>
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
