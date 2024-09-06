import Link from "next/link";
import type { ReactElement } from "react";
import { Icons } from "ui";

//  LearnWeb3Banner, PartnerBanner
import PageSeoLayout from "@/components/PageSeoLayout";
import type { NextPageWithLayout } from "@/pages/_app";

const Home: NextPageWithLayout = () => {
  return (
    <div className=" flex flex-col items-center justify-center">
      {/* HeroSection */}
      <div className=" mb-[118px] mt-[310px]">
        <div className=" text-white">
          <h1 className=" text-bttf text-center text-5xl tracking-wide  lg:text-[100px]">
            <span className=" md:ml-[60px]">Learn</span>
            <br />
            <span>web3__</span>
            <br />
            <span className=" md:mr-[50px]">with</span>
            <br />
            <span>friends</span>
          </h1>

          <div className=" flex flex-col items-center justify-center ">
            <div className="max-w-[495px] text-center text-xl font-light md:mt-[50px] md:text-2xl">
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
      <div></div>
    </div>

    // <>
    //   <section className=" academy-grid d:w-[707px] flex flex-col items-center justify-center md:mt-[310px]">
    //     <div className=" flex flex-col items-center justify-center">
    // <div className="hidden justify-center md:flex">
    //   <div className=" text-bttf-lg">
    //     <h1>
    //       Learn
    //       <br />
    //       web3__
    //       <br />
    //       with
    //       <br />
    //       friends
    //     </h1>
    //   </div>
    // </div>
    // <div className="description max-w-[495px]">
    //   <p>Become a web3 developer with Developer DAO.</p>
    // </div>
    // <div className="hidden w-full items-center justify-center md:flex">
    //   <Link href="/#learn-web3" className="hover:cursor-pointer">
    //     <Icons.scroll className="h-16 w-16" />
    //   </Link>
    // </div>
    // </div>
    //     {/* <div className="flex h-full items-center justify-center md:hidden">
    //       <div className="text-bttf-lg">
    //         <h1>learn</h1>
    //         <h1>web3__</h1>
    //         <h1>with</h1>
    //         <h1>friends</h1>
    //       </div>
    //     </div> */}
    //   </section>
    //   <section id="learn-web3" className="main-container lg:pt-16">
    //     <LearnWeb3Banner href="/tracks" />
    //   </section>
    //   <section id="partners" className="main-container pb-4 pt-16">
    //     <PartnerBanner
    //       href="https://airtable.com/appDMMIARfSeiovpk/shrZExypPetXEx6Ox"
    //       imgSrc="/dd_logo.svg"
    //     />
    //   </section>
    // </>
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
