import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { Icons, LearnWeb3Banner, PartnerBanner } from "ui";

//  LearnWeb3Banner, PartnerBanner
import PageSeoLayout from "@/components/PageSeoLayout";
import type { NextPageWithLayout } from "@/pages/_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      {/* Background with Overlay */}
      <div className="relative overflow-hidden bg-[url('/bg_home.png')] bg-cover bg-center bg-no-repeat">
        {/* Overlay */}
        <div className="absolute inset-0 z-10 w-screen bg-black opacity-50"></div>

        {/* Hero Section */}
        <div className="relative z-20 pt-[150px] md:pb-[118px] md:pt-[330px]">
          <div className="flex flex-col items-center justify-center text-white">
            <h1 className="text-bttf text-center text-5xl text-[50px] tracking-wide lg:text-[100px]">
              <span className="md:ml-[50px]">LEArn</span>
              <br />
              <span>WEB3__</span>
              <br />
              <span className="md:mr-[50px]">WITH</span>
              <br />
              <span className="relative flex items-baseline justify-end gap-x-2 md:ml-[20px]">
                FRIENDS
                <span className=" -right-20 bottom-0 ml-2 h-[25px] w-[25px] overflow-hidden rounded-full md:absolute md:ml-5 md:h-[50px] md:w-[50px]">
                  <Image alt="devIcon" src={"/dd_nft2.png"} width={500} height={500} />
                </span>
              </span>
            </h1>

            <div className="mb-[7px] mt-[87px] flex flex-col items-center justify-center md:mb-0 md:mt-[50px]">
              <div className="max-w-[495px] px-10 text-center text-lg font-light md:px-0 md:text-2xl">
                <p>Become a web3 developer with DeveloperDAO.</p>
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
        <div className="relative z-20 flex flex-col items-center justify-center pb-[400px]">
          <div className="m-5 md:p-0">
            <div id="learn-web3" className="lg:pt-16">
              <LearnWeb3Banner href="/tracks" />
            </div>
          </div>
          <div className="m-5 md:p-0">
            <div id="partners" className="pb-4 pt-16">
              <PartnerBanner
                href="https://airtable.com/appDMMIARfSeiovpk/shrZExypPetXEx6Ox"
                imgSrc="/dd_logo.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
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
