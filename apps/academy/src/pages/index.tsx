import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { Icons, LearnWeb3Banner, PartnerBanner } from "ui";

//  LearnWeb3Banner, PartnerBanner
import PageSeoLayout from "@/components/PageSeoLayout";
import type { NextPageWithLayout } from "@/pages/_app";

const Home: NextPageWithLayout = () => {
  return (
    <div className=" ">
      {/* HeroSection */}
      <div className=" mt-[150px] md:mb-[118px] md:mt-[230px]">
        <div className=" flex flex-col items-center justify-center text-white">
          <h1 className=" text-bttf text-center text-5xl tracking-wide  lg:text-[100px]">
            <span className=" md:ml-[50px]">LEArn</span>
            <br />
            <span>WEB3__</span>
            <br />
            <span className=" md:mr-[50px]">WITH</span>
            <br />
            <span className=" flex items-baseline gap-x-2">
              FRIENDS{" "}
              <span className=" h-[25px] w-[25px] overflow-hidden rounded-full md:h-[55px] md:w-[55px]">
                <Image
                  alt="devIcon"
                  src={"/bg_home.png"}
                  width={500}
                  height={500}
                  className=" h-full w-full"
                />
              </span>{" "}
            </span>
          </h1>

          <div className=" flex flex-col items-center justify-center ">
            <div className="mt-[10px] max-w-[495px] px-10 text-center text-lg font-light md:mt-[50px] md:px-0 md:text-2xl">
              <p>Become a web3 developer with Developer DAO.</p>
            </div>
            <div className="hidden w-full items-center justify-center md:mt-[20px] md:flex">
              <Link href="/#learn-web3" className="hover:cursor-pointer">
                <Icons.scroll className="h-16 w-16" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className=" flex flex-col items-center justify-center">
        <div>
          <div id="learn-web3" className="lg:pt-16">
            <LearnWeb3Banner href="/tracks" />{" "}
          </div>
        </div>
        <div>
          <div id="partners" className="  pb-4 pt-16">
            <PartnerBanner
              href="https://airtable.com/appDMMIARfSeiovpk/shrZExypPetXEx6Ox"
              imgSrc="/dd_logo.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageSeoLayout
      title="Learn Web3 With Friends"
      description="Start your journey to become a Web3 Developer today. Free high-quality courses to learn web3 with Developer DAO Academy."
    >
      {page}
    </PageSeoLayout>
  );
};

export default Home;

// h-[480px] w-[1185px]
