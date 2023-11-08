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
      <div className="mb-16">
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
      <div className="mx-8 mt-8 max-w-sm md:m-auto">
        <div className="flex flex-col items-center gap-x-6 md:flex-row">
          <Image src={imgSrc} width={120} height={120} alt="partner" className="rounded-full" />
          <div className="separator" />
          <div className=" flex flex-wrap items-center justify-center gap-6 md:justify-normal">
            {[
              "/partners/zerion.png",
              "/partners/polygon-logo.png",
              "/partners/pokt.png",
              "/partners/api3-logo.png",
            ].map((e, i) => (
              <Image
                key={i}
                src={e}
                width={200}
                height={50}
                alt="partner"
                className="h-auto max-h-10 w-auto"
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PartnerBanner;
