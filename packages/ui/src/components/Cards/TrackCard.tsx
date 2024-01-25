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
  author: string;
  description: string;
}

const TrackCard: FC<TrackCardProps> = ({ imgSrc, tags, title, description }) => {
  return (
    <Card className="track">
      <Image
        src={imgSrc}
        alt="eth_family"
        width={20}
        height={20}
        className="h-40 w-full bg-cover bg-no-repeat"
      />
      {/* <div className="mr-3 mt-4 flex justify-end"> */}
      {/* <Badge className="gray-badge">Nov 22</Badge> */}
      {/* </div> */}
      <div className="ml-2 mt-2 flex w-full gap-x-2 text-xs ">
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
        <Separator className="opacity-10" />
      </CardHeader>
    </Card>
  );
};

export { TrackCard };
