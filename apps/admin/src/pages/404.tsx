import type { ReactElement } from "react";
import { Container } from "ui";

import PageSeoLayout from "@/components/PageSeoLayout";
import type { NextPageWithLayout } from "@/pages/_app";

const NotFound: NextPageWithLayout = () => {
  return (
    <Container>
      <main className="pb-8 pt-16 sm:pt-24">
        <h1 className="dark: mx-auto text-center text-6xl  font-extrabold sm:text-7xl lg:text-8xl">
          Page Not Found
        </h1>
        <div className="mx-auto mt-5 text-center ">
          Sorry, the page you&#39;re looking for isn&#39;t there. Maybe it got moved, or deleted?
        </div>
      </main>
    </Container>
  );
};

NotFound.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageSeoLayout
      title="Dapp Page" // DEV_NOTE: This is for the next-seo per page config
      description="A page for your dapp." // DEV_NOTE: This is for the next-seo per page config
    >
      {page}
    </PageSeoLayout>
  );
};

export default NotFound;
