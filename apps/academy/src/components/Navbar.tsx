import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components/ui/avatar";

export default function Navbar() {
  return (
    <nav className="mt-7 flex items-center justify-around gap-36 text-white">
      <div>
        <h2 className="font-future">Back</h2>
        <Link href="/">
          <Image src={"/back.png"} alt="turn back" width={25} height={35} className="rotate-180" />
        </Link>
      </div>
      <Avatar>
        <AvatarImage src="/DD_NFT_avatar.png" />
        <AvatarFallback>DD</AvatarFallback>
      </Avatar>
    </nav>
  );
}
