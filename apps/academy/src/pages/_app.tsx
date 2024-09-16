import "@/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

import { MDXProvider } from "@mdx-js/react";
import {
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { zerionWallet } from "@rainbow-me/rainbowkit/wallets";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { Analytics } from "@vercel/analytics/react";
import merge from "lodash.merge";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { ReactElement, ReactNode } from "react";
import { Toaster } from "ui";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import { Layout } from "@/components/Layout";
import Components from "@/components/mdx/Components";
import { AppContextProvider } from "@/contexts/AppContextProvider";
import { env } from "@/env.mjs";
import { api } from "@/utils/api";

import SEO from "../next-seo.config";

const { chains, publicClient } = configureChains([mainnet], [publicProvider()]);

const projectId = env.NEXT_PUBLIC_WALLET_CONNECT_ID;

const { wallets } = getDefaultWallets({
  appName: "D_D Academy",
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  {
    groupName: "D_D Preferred Partner",
    wallets: [zerionWallet({ projectId, chains })],
  },
  ...wallets,
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const academyLightTheme = merge(
  lightTheme({
    overlayBlur: "small",
  }),
  {
    colors: {
      accentColor: "var(--button-secondary-dark);",
      // modalBackground: "var(--gray-white);",
      modalBackdrop: "gradient-neutral",
    },
    fonts: {
      body: "var(--font-poppins);",
    },
  },
);

const academyDarkTheme = merge(
  darkTheme({
    overlayBlur: "small",
  }),
  {
    colors: {
      accentColor: "var(--button-secondary);",
      modalBackground: "var(--academy-card-dark);",
      modalBackdrop: "gradient-neutral",
    },
    fonts: {
      body: "var(--font-poppins);",
    },
  },
);

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout<{ session: Session | null }>) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <MDXProvider components={Components}>
      <ThemeProvider attribute="class">
        <WagmiConfig config={wagmiConfig}>
          <SessionProvider refetchInterval={0} session={pageProps.session}>
            <RainbowKitSiweNextAuthProvider>
              <RainbowKitProvider
                chains={chains}
                initialChain={mainnet}
                appInfo={{
                  appName: "Developer DAO Academy",
                  learnMoreUrl: "https://academy.developerdao.com",
                }}
                theme={{
                  lightMode: academyLightTheme,
                  darkMode: academyDarkTheme,
                }}
              >
                <DefaultSeo {...SEO} />
                <Head>
                  <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                  />
                </Head>
                <AppContextProvider>
                  <Layout>
                    {getLayout(<Component {...pageProps} />)}
                    <Analytics mode={"production"} />
                  </Layout>
                  <Toaster />
                </AppContextProvider>
              </RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </SessionProvider>
        </WagmiConfig>
      </ThemeProvider>
    </MDXProvider>
  );
}

export default api.withTRPC(MyApp);
