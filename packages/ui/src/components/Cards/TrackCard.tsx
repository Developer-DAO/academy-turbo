// import NextImage from "next/image"; // after migration
import Image from "next/image";
import type { FC } from "react";

import { Badge } from "../ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

export interface TrackCardProps {
  imgSrc: string;
  tags: string[];
  title: string;
  author: string | string[];
  description: string;
}

const TrackCard: FC<TrackCardProps> = ({ imgSrc, tags, title, description }) => {
  return (
    <div className="track !border-none !bg-opacity-20 !bg-gradient-to-tr from-stone-700 from-10% via-black via-60% to-[#727171]  to-90% p-[1.5px]">
      <Card className="track !bg-black ">
        <Image
          src={imgSrc}
          alt="eth_family"
          width={20}
          height={20}
          className="h-40 w-full rounded-t-[51px] bg-no-repeat object-cover"
          unoptimized
        />
        <div className="mt-3 flex w-full gap-x-2 px-4 text-base">
          {tags.map((tag, i) => (
            <Badge
              key={i}
              className={`${
                i === 0
                  ? "gray-badge bg-[#155D61] hover:bg-[#155D6180]"
                  : "gray-badge bg-[var(--academy-dark)]"
              }`}
            >
              {tag}
            </Badge>
          ))}
        </div>
        <CardHeader className="space-y-4 pb-10">
          <CardTitle className="title">{title}</CardTitle>
          <CardDescription className="description">{description}</CardDescription>
        </CardHeader>
        <Separator className="opacity-10" />
      </Card>
    </div>
  );
};

export { TrackCard };
