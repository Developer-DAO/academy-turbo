import "@/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { ledgerWallet, trustWallet, zerionWallet } from "@rainbow-me/rainbowkit/wallets";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { ReactElement, ReactNode } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import { Layout } from "@/components/Layout";
import { env } from "@/env.mjs";
import { api } from "@/utils/api";

import SEO from "../next-seo.config";
const { chains, publicClient } = configureChains([polygonMumbai], [publicProvider()]);

const projectId = env.NEXT_PUBLIC_WALLET_CONNECT_ID;

const { wallets } = getDefaultWallets({
  appName: "D_D Academy",
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      zerionWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout<{ session: Session }>) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <WagmiConfig config={wagmiConfig}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <RainbowKitSiweNextAuthProvider>
          <RainbowKitProvider chains={chains} initialChain={polygonMumbai}>
            <ThemeProvider attribute="class">
              <DefaultSeo {...SEO} />
              <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
            </ThemeProvider>
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default api.withTRPC(MyApp);
