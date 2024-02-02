import Link from "next/link";
import type { ReactElement } from "react";
import { Icons, LearnWeb3Banner, PartnerBanner } from "ui";

import PageSeoLayout from "@/components/PageSeoLayout";
import type { NextPageWithLayout } from "@/pages/_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <section className="academy-grid app-container">
        <div className="academy-grid-col-1">
          <div className="hidden justify-center md:flex">
            <div className="text-bttf-lg">
              <h1>learn</h1>
              <h1>web3 __</h1>
              <h1>with</h1>
              <h1>friends</h1>
            </div>
          </div>
          <div className="description max-w-[495px]">
            <p>Become a web3 developer with Developer DAO.</p>
          </div>
          <div className="hidden w-full items-center justify-center md:flex">
            <Link href="/#learn-web3">
              <Icons.scroll className="h-16 w-16" />
            </Link>
          </div>
        </div>
        <div className="dd-nft">
          <div className="flex h-full items-end justify-center md:hidden">
            <div className="text-bttf-lg">
              <h1>learn</h1>
              <h1>web3 __</h1>
              <h1>with</h1>
              <h1>friends</h1>
            </div>
          </div>
        </div>
      </section>
      <section id="learn-web3" className="main-container">
        <LearnWeb3Banner href="/tracks" />
      </section>
      <section id="partners" className="main-container">
        <PartnerBanner
          href="https://airtable.com/appDMMIARfSeiovpk/shrZExypPetXEx6Ox"
          imgSrc="/DD_NFT_avatar.png"
        />
      </section>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageSeoLayout
      title="Developer DAO Academy" // DEV_NOTE: This is for the next-seo per page config
      description="Become a web3 developer with Developer DAO." // DEV_NOTE: This is for the next-seo per page config
    >
      {page}
    </PageSeoLayout>
  );
};

export default Home;
