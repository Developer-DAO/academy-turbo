// import NextImage from "next/image"; // after migration
import Image from "next/image";
import type { FC } from "react";

import { Badge } from "../ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

export interface TrackCardProps {
  imgSrc: string;
}

const TrackCard: FC<TrackCardProps> = ({ imgSrc }) => {
  return (
    <Card className="track !bg-none">
      <Image
        src={imgSrc}
        alt="eth_family"
        width={20}
        height={20}
        className="h-36 w-full bg-cover bg-no-repeat"
      />
      <div className="mr-3 mt-4 flex justify-end">
        <Badge className="gray-badge">Nov 22</Badge>
      </div>
      <div className="mt-2 flex w-full gap-x-3 px-1">
        {["Web3", "DeFi"].map((tag, i) => (
          <Badge key={i} className="gray-badge">
            {tag}
          </Badge>
        ))}
      </div>
      <CardHeader className="space-y-4 pb-10">
        <div>
          <CardTitle className="title">Intro to Ethereum</CardTitle>
          <CardTitle className="title">By X</CardTitle>
        </div>
        <CardDescription className="description">
          Foundry is a blazing fast, portable and modular toolkit for Ethereum application
          development written in Rust.
        </CardDescription>
        <Separator className="opacity-10" />
      </CardHeader>
    </Card>
  );
};

export { TrackCard };
