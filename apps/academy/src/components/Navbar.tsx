// Component not used anymore - code implemented on Header Component 23 nov 2023

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components/ui/avatar";

export default function Navbar() {
  return (
    <nav className="mt-7 flex items-center justify-around gap-36 text-white lg:mt-8 lg:flex lg:justify-between lg:gap-5 lg:self-stretch">
      <div className="lg:ml-8 lg:flex lg:basis-[0%] lg:flex-col lg:items-stretch">
        <h2 className="font-future lg:text-2xl">Back</h2>
        <Link href="/">
          <Image
            src={"/back.png"}
            alt="turn back"
            width={25}
            height={35}
            className="rotate-180 lg:hidden"
          />
          <Image
            src={"/back.png"}
            alt="turn back"
            width={50}
            height={35}
            className="hidden lg:block lg:rotate-180"
          />
        </Link>
      </div>
      <div className="lg:mr-20 lg:flex lg:w-[98px] lg:max-w-full lg:items-center lg:justify-center lg:gap-5">
        <Image
          src="/ph_moon-light.png"
          alt="moon"
          width={25}
          height={25}
          className="hidden lg:inline-block lg:rounded-full lg:border lg:border-white"
        />
        <Avatar className="h-8 w-8 lg:h-14 lg:w-14">
          <AvatarImage src="/DD_NFT_avatar.png" />
          <AvatarFallback>DD</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
