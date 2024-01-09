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
        <CardContent className="description max-w-2xl p-1 pb-12 md:pb-1">
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
          <Image src={imgSrc} width={250} height={250} alt="partner" className="rounded-full" />
          <div className="separator" />
          <div className=" flex flex-wrap items-center justify-center gap-10 md:justify-normal">
            {["/partners/pokt.png", "/partners/zerion.png", "/partners/api3-logo.png"].map(
              (logoPath, i) => (
                <Image
                  key={i}
                  src={logoPath}
                  width={200}
                  height={50}
                  alt="partner"
                  className={`h-auto max-h-14 w-auto ${i === 0 ? "mb-3 pl-2" : ""} ${
                    i === 2 ? "max-h-20" : ""
                  }`}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PartnerBanner;
