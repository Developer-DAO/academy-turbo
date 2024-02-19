import type { ReactElement } from "react";
import { Container } from "ui";

import PageSeoLayout from "@/components/PageSeoLayout";
import type { NextPageWithLayout } from "@/pages/_app";

const NotFound: NextPageWithLayout = () => {
  return (
    <Container>
      <main className="pb-8 pt-16 sm:pt-24">
        <h1 className="mx-auto text-center text-6xl font-extrabold text-white dark:text-white sm:text-7xl lg:text-8xl">
          Page Not Found
        </h1>
        <div className="mx-auto mt-5 text-center text-white">
          Sorry, the page you&#39;re looking for isn&#39;t there. Maybe it got moved, or deleted?
        </div>
      </main>
    </Container>
  );
};

NotFound.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageSeoLayout
      title="404 Page Not Found"
      description="Sorry, the page you&#39;re looking for isn&#39;t there."
    >
      {page}
    </PageSeoLayout>
  );
};

export default NotFound;
