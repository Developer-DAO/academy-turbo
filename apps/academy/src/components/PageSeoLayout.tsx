import { NextSeo } from "next-seo";

interface PageSeoLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const PageSeoLayout: React.FC<PageSeoLayoutProps> = ({
  title,
  description,
  children,
}: PageSeoLayoutProps) => {
  return (
    <>
      <NextSeo title={title} description={description} />
      {children}
    </>
  );
};

export default PageSeoLayout;
