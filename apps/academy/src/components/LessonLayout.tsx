// import AboutCourse from "@/components/AboutCourse";
import { useRouter } from "next/router";

import CreatedBy from "@/components/CreatedBy";
import PageSeoLayout from "@/components/PageSeoLayout";
import { api } from "@/utils/api";

interface LessonLayoutProps {
  children: React.ReactNode;
  lessonTitle: string;
  lessonImage?: string;
  author: string;
  authorImage: string;
  authorPosition: string;
  authorTwitter: string;
  createdDate: string;
}

export default function LessonLayout({
  children,
  lessonTitle,
  lessonImage = "default-meta-image.png",
  author,
  authorImage,
  authorTwitter,
}: LessonLayoutProps) {
  const router = useRouter();

  console.log(router.pathname);

  const { data: lessonData } = api.lessons.getLessonsByLessonPath.useQuery({
    lessonPath: router.pathname,
  });
  console.log({ lessonData });
  return (
    <PageSeoLayout
      title={lessonTitle}
      // This should be the individual lesson description eventually
      description="Start your journey to become a Web3 Developer today. Free high-quality courses to learn web3 with Developer DAO Academy."
      openGraph={{
        images: [
          {
            url:
              process.env["NEXT_PUBLIC_VERCEL_URL"] !== undefined
                ? `https://${process.env["NEXT_PUBLIC_VERCEL_URL"]}/${lessonImage}}`
                : lessonImage,
            alt: lessonTitle,
          },
        ],
      }}
    >
      <main className="px-10 pt-36 text-white lg:mx-auto lg:max-w-screen-lg lg:pt-44">
        <section className="text-center">
          <h1 className="font-future text-3xl lg:text-6xl">{lessonTitle}</h1>
        </section>
        <CreatedBy author={author} authorImage={authorImage} authorTwitter={authorTwitter} />
        <div className="font-poppins pt-4 text-xl font-medium tracking-wider lg:mx-auto lg:max-w-screen-lg">
          {children}
        </div>
      </main>
    </PageSeoLayout>
  );
}
