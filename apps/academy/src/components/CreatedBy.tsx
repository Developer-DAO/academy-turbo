import { Avatar, AvatarFallback, AvatarImage } from "ui/components/ui/avatar";

export default function CreatedBy() {
  return (
    <section className="grid place-items-center pt-6 text-sm lg:mr-10 lg:text-xl">
      <p className="text-center">Created by:</p>
      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-4">
        <Avatar className="mt-7 h-16 w-16">
          <AvatarImage src="/azuki.png" />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
        <article className="mt-7 font-light">
          <p>Dave C</p>
          <p>
            Dave C is a Full Stack Python <br /> Developer at the Ethereum <br /> Foundation
          </p>
          <p>Twitter @DaveC.eth</p>
        </article>
      </div>
      <div className="mt-4">
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
      </div>
    </section>
  );
}
