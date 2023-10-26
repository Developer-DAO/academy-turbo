// import Image from "next/image"; to be used with imgSrc
import Image from "next/image";
import NextLink from "next/link";
import type { FC } from "react";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { HomePageBannerProps } from "./LearnWeb3Banner";

export interface PartnerBannerProps extends HomePageBannerProps {
  imgSrc: string;
}

export const PartnerBanner: FC<PartnerBannerProps> = ({ href, imgSrc }) => {
  return (
    <Card className="banner flex-col-reverse lg:flex-row">
      <div>
        <CardHeader className="flex-row justify-center">
          <CardTitle className="title">Partner with D_D Academy</CardTitle>
        </CardHeader>
        <CardContent className="description max-w-2xl">
          <p>
            Developer DAO is a community of thousands of web3 builders creating a better internet.
            Join us and help educate the next generation of developers.
          </p>
        </CardContent>
        <div className=" flex justify-center">
          <Button asChild className="button-rounded text-black">
            <NextLink href={href}>reach out!</NextLink>
          </Button>
        </div>
      </div>
      <div className=" m-auto max-w-lg">
        <div className="flex flex-row items-center gap-x-6">
          <Image
            src={imgSrc}
            width={100}
            height={100}
            alt="partner"
            className="w-30 h-14 rounded-full"
          />
          <div className="h-20 border" />
          <div className=" flex flex-wrap gap-6">
            {[
              "https://zerion.io/blog/content/images/2023/03/Zerion-Blog.png",
              "https://upload.wikimedia.org/wikipedia/commons/2/24/Polygon_blockchain_logo.png",
              "https://moonbeam.network/wp-content/uploads/2022/06/pocket-logo.png",
              "https://altcoinsbox.com/wp-content/uploads/2023/03/the-graph-logo-300x300.webp",
              "https://global.discourse-cdn.com/standard11/uploads/scroll2/original/2X/3/3bc70fd653f9c50abbb41b7568e549535f768fcc.png",
              "https://seeklogo.com/images/A/api3-logo-7A7D29C8F6-seeklogo.com.png",
            ].map((e, i) => (
              <Image
                key={i}
                src={e}
                width={100}
                height={100}
                alt="partner"
                className="max-w-30 h-auto max-h-12 w-auto"
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PartnerBanner;
