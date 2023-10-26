// import Image from "next/image"; to be used with imgSrc
import NextLink from "next/link";
import type { FC } from "react";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { HomePageBannerProps } from "./LearnWeb3Banner";

export interface PartnerBannerProps extends HomePageBannerProps {
  imgSrc: string;
}

export const PartnerBanner: FC<PartnerBannerProps> = ({ href /** imgSrc*/ }) => {
  return (
    <Card className="banner flex-col lg:flex-row">
      <div>
        <CardHeader className="flex-row justify-center">
          <CardTitle className="title">Partner with D_D Academy</CardTitle>
        </CardHeader>
        <CardContent className="description">
          <p>
            Developer DAO is a community of thousands of web3 builders creating a better internet.
            Join us and help educate the next generation of developers.
          </p>
        </CardContent>
        <CardContent className=" flex justify-center">
          <Button asChild className="button-rounded text-black">
            <NextLink href={href}>reach out!</NextLink>
          </Button>
        </CardContent>
      </div>
      <div className="m-auto text-3xl text-white">[ image here ]</div>
    </Card>
  );
};

export default PartnerBanner;
