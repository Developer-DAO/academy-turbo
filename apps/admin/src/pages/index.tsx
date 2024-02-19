import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { type ReactElement,useEffect } from "react";
import { useAccount } from "wagmi";

import PageSeoLayout from "@/components/PageSeoLayout";
import type { NextPageWithLayout } from "@/pages/_app";

const Home: NextPageWithLayout = () => {
  const { address } = useAccount();
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (address !== undefined && status === "authenticated") {
      if (
        address === "0x4475FD456140b28944e322e8CC4B1740f161c7dA" ||
        address === "0xEe94137fE98D3fa740e144dB3A329737eb889356"
      ) {
        void router.push("/tracks");
      }
    }
  }, [address, status]);

  return (
    <>
      <section className="flex h-screen max-h-screen align-middle">
        <div className="border-1 h-full w-full">
          <p className="font-zen-kaku mt-[25%] w-full text-center align-middle text-lg text-white">
            Connect your wallet to verify access
          </p>
        </div>
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
