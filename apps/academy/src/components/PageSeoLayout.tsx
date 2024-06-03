import { NextSeo } from "next-seo";

interface PageSeoLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  openGraph?: any;
}

const PageSeoLayout: React.FC<PageSeoLayoutProps> = ({
  title,
  description,
  children,
  openGraph,
}: PageSeoLayoutProps) => {
  return (
    <>
      <NextSeo title={title} description={description} openGraph={openGraph} />
      {children}
    </>
  );
};

export default PageSeoLayout;
