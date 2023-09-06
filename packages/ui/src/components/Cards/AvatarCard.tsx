import { Link } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";

import { Card, CardContent, CardHeader } from "../ui/card";

export interface AvatarCardProps {
  imgSrc: string;
}

export const AvatarCard: FC<AvatarCardProps> = ({ imgSrc }) => {
  return (
    <Card className="profile-card">
      <div className="grid justify-items-center px-10">
        <CardHeader>
          <Image
            src={imgSrc}
            width={20}
            height={20}
            alt="Developer DAO avatar"
            className="w-full"
          />
        </CardHeader>
        <CardContent className="text-center">
          <h3 className="title">John Smith</h3>
          <div className="flex items-center">
            <p className="description">Share</p> <Link width={20} />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
