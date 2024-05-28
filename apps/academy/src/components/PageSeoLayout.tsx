import { NextSeo } from "next-seo";

interface PageSeoLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  imgPath?: string;
}

const PageSeoLayout = ({ title, description, children }: PageSeoLayoutProps) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        // openGraph={{
        //   title: title,
        //   description: description,
        //   images: [
        //     {
        //       url: imgPath
        //         ? `https://${process.env["NEXT_PUBLIC_VERCEL_URL"]}/${imgPath}`
        //         : imgPath,
        //       alt: title,
        //     },
        //   ],
        // }}
      />
      {children}
    </>
  );
};

export default PageSeoLayout;
