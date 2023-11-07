import type { ReactElement } from "react";
import { Icons, LearnWeb3Banner, PartnerBanner } from "ui";

import PageSeoLayout from "@/components/PageSeoLayout";
import type { NextPageWithLayout } from "@/pages/_app";

const Home: NextPageWithLayout = () => {
  return (
    <main>
      <div className="academy-grid">
        <div className="academy-grid-col-1">
          <div className="text-bttf-lg">
            <h1>learn</h1>
            <h1>web3 __</h1>
            <h1>with</h1>
            <h1>frens</h1>
          </div>
          <div className="description max-w-lg">
            <p>Become a web3 developer with DeveloperDAO.</p>
          </div>
          <div className="flex w-full items-center justify-center">
            <Icons.scroll className="h-16 w-16" />
          </div>
        </div>
        <div className="dd-nft" />
      </div>
      <div className="main-container space-y-16 py-16">
        <LearnWeb3Banner href="" />
        <PartnerBanner href="" imgSrc="/DD_NFT_avatar.png" />
      </div>
    </main>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageSeoLayout
      title="Developer DAO Academy" // DEV_NOTE: This is for the next-seo per page config
      description="Become a web3 developer with DeveloperDAO." // DEV_NOTE: This is for the next-seo per page config
    >
      {page}
    </PageSeoLayout>
  );
};

export default Home;
