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

const TrackCard: FC<TrackCardProps> = ({ imgSrc, tags, title, description, author }) => {
  return (
    <div className="min-h-[30rem] rounded-[51px] bg-gradient-to-r from-[#E9E9E9] via-black to-[#E9E9E9] p-0.5">
      <Card className="track min-h-[30rem] rounded-[51px] bg-black hover:bg-zinc-900">
        <Image
          src={imgSrc}
          alt="eth_family"
          width={20}
          height={20}
          className="h-36 w-full bg-cover bg-no-repeat"
        />
        {/* <div className="mr-3 mt-4 flex justify-end"> */}
        {/* <Badge className="gray-badge">Nov 22</Badge> */}
        {/* </div> */}
        <div className="ml-2 mt-2 flex w-full items-center justify-start gap-x-1 text-xs ">
          {tags.map((tag, i) => (
            <Badge key={i} className="gray-badge min-w-fit p-2 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <CardHeader className="space-y-4 pb-10">
          <div>
            <CardTitle className="title">{title}</CardTitle>
            <CardTitle className="title">By {author}</CardTitle>
          </div>
          <CardDescription className="description">{description}</CardDescription>
          <Separator className="opacity-10" />
        </CardHeader>
      </Card>
    </div>
  );
};

export { TrackCard };
