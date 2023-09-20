import type { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  titleTemplate: "Developer DAO Academy | %s",
  defaultTitle: "Developer DAO Academy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url:
      process.env["NEXT_PUBLIC_VERCEL_URL"] !== undefined
        ? `https://${process.env["NEXT_PUBLIC_VERCEL_URL"]}`
        : "",
    site_name: `Developer DAO Academy`,
    images: [
      {
        url:
          process.env["NEXT_PUBLIC_VERCEL_URL"] !== undefined
            ? `https://${process.env["NEXT_PUBLIC_VERCEL_URL"]}/landing-page-screenshot.png`
            : "",
        alt: "Developer DAO Academy",
        type: "image/png",
      },
    ],
  },
  twitter: {
    handle: "@devdao_academy",
    site: "@devdao_academy",
    cardType: "summary_large_image",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
};

export default config;
