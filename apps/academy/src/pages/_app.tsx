import "@/styles.css";
import "ui/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

import {
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { ledgerWallet, trustWallet, zerionWallet } from "@rainbow-me/rainbowkit/wallets";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import merge from "lodash.merge";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { ReactElement, ReactNode } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import { Layout } from "@/components/Layout";
import { TracksLayout } from "@/components/TracksLayout";
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
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  // If the current route is '/fundamentals', don't use the Layout
  if (router.pathname === "/fundamentals") {
    return (
      <WagmiConfig config={wagmiConfig}>
        <SessionProvider refetchInterval={0} session={pageProps.session}>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider
              chains={chains}
              initialChain={polygonMumbai}
              appInfo={{
                appName: "Developer DAO Academy",
                learnMoreUrl: "https://academy.developerdao.com",
              }}
              theme={{
                lightMode: academyLightTheme,
                darkMode: academyDarkTheme,
              }}
            >
              <ThemeProvider attribute="class">
                <DefaultSeo {...SEO} />
                <Head>
                  <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                  />
                </Head>
                <TracksLayout>
                  <Component {...pageProps} />
                </TracksLayout>
              </ThemeProvider>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </WagmiConfig>
    );
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <RainbowKitSiweNextAuthProvider>
          <RainbowKitProvider
            chains={chains}
            initialChain={polygonMumbai}
            appInfo={{
              appName: "Developer DAO Academy",
              learnMoreUrl: "https://academy.developerdao.com",
            }}
            theme={{
              lightMode: academyLightTheme,
              darkMode: academyDarkTheme,
            }}
          >
            <ThemeProvider attribute="class">
              <DefaultSeo {...SEO} />
              <Head>
                <meta
                  name="viewport"
                  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                />
              </Head>
              <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
            </ThemeProvider>
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default api.withTRPC(MyApp);
