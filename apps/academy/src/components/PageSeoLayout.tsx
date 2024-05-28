import { NextSeo, type NextSeoProps } from "next-seo";

import defaultSeoConfig from "../next-seo.config";

// interface PageSeoLayoutProps {
//   title: string;
//   description: string;
//   children: React.ReactNode;
//   openGraph?: Object
// }

type PageSeoLayoutProps = NextSeoProps

const PageSeoLayout: React.FC<PageSeoLayoutProps> = ({
  title,
  description,
  children,
  openGraph,
}: PageSeoLayoutProps) => {
  const seoConfig = {
    title: title ?? defaultSeoConfig.defaultTitle,
    description: description ?? defaultSeoConfig.description,
    openGraph: {
      ...defaultSeoConfig.openGraph,
      ...openGraph,
    },
    twitter: {
      ...defaultSeoConfig.twitter,
    },
  };
  return (
    <>
      <NextSeo {...seoConfig} />
      {children}
    </>
  );
};

export default PageSeoLayout;
