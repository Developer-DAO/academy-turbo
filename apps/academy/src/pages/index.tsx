import type { ReactElement } from "react";
import { Container } from "ui";

import PageSeoLayout from "@/components/PageSeoLayout";
import type { NextPageWithLayout } from "@/pages/_app";
import { api } from "@/utils/api";

const Home: NextPageWithLayout = () => {
  const {
    data: ExampleHelloData,
    isLoading: ExampleHelloIsLoading,
    // refetch: ExampleHelloRefetch,
  } = api.example.hello.useQuery({
    text: "Hello World",
  });

  console.log({ ExampleHelloData, ExampleHelloIsLoading });

  return (
    <Container>
      <main className="pb-8 pt-16 sm:pt-24">
        <h1 className="mx-auto text-center text-6xl font-extrabold text-neutral-900 dark:text-white sm:text-7xl lg:text-8xl">
          Website SSR
          <span className="block bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text py-8 text-transparent">
            Turbo Monorepo
          </span>
        </h1>
      </main>
    </Container>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageSeoLayout
      title="Dapp Page" // DEV_NOTE: This is for the next-seo per page config
      description="A page for your dapp." // DEV_NOTE: This is for the next-seo per page config
    >
      {page}
    </PageSeoLayout>
  );
};

export default Home;
