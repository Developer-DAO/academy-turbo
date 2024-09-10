import Image from "next/image";
import type { FC } from "react";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { HomePageBannerProps } from "./LearnWeb3Banner";

export interface PartnerBannerProps extends HomePageBannerProps {
  imgSrc: string;
}

export const PartnerBanner: FC<PartnerBannerProps> = ({ href, imgSrc }) => {
  return (
    <div className=" banner flex-col !border-none !bg-opacity-20 !bg-gradient-to-tr from-stone-700 from-10% via-black via-60%  to-[#727171] to-90% !p-[2px] lg:flex-row">
      <Card className=" banner !bg-opacity-85 flex-col !border-none !bg-black lg:flex-row">
        <div className="w-[78rem] items-center justify-center md:flex">
          <div className="md:py-[25px] md:pl-[30px] md:pr-[200px]">
            <CardHeader className="flex-row justify-center">
              <CardTitle className="title !text-[40px]">Partner with D_D Academy</CardTitle>
            </CardHeader>
            <CardContent className=" p-1 pb-12 text-center text-[17px] font-light text-white md:mb-[40px] md:pb-1">
              <p>
                Developer DAO is a community of thousands of web3 <br /> builders creating a better
                internet. Join us and help <br /> educate the next generation of developers.
              </p>
            </CardContent>
            <div className=" flex justify-center">
              <Button
                asChild
                className="button-rounded text-black hover:bg-[#721F79] hover:text-white"
              >
                <a href={href} target="_blank">
                  reach out!
                </a>
              </Button>
            </div>
          </div>
          <div className="felx-col ml-8 mr-4  mt-8 flex items-center justify-center md:m-auto">
            <div className="flex flex-col items-center">
              <Image
                src={imgSrc}
                width={100}
                height={100}
                alt="partner"
                className="mb-4 h-[90px] w-[84px] rounded-full md:mb-[60px] md:ml-[45px] lg:mr-[50px]"
              />
              <div className=" mb-4 h-[1px] w-full border border-gray-700" />
              <div className="flex flex-wrap items-center justify-center gap-6">
                {[
                  "/partners/pokt.png",
                  "/partners/zerion.png",
                  "/partners/api3-logo.png",
                  "/partners/scroll.png",
                ].map((logoPath, i) => (
                  <Image
                    key={i}
                    src={logoPath}
                    width={175}
                    height={25}
                    alt="partner"
                    className={`${i === 2 ? "max-h-10" : "max-h-7"} w-auto ${
                      i === 0 ? "mb-4" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PartnerBanner;
