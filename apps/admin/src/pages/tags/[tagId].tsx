import { useRouter } from "next/router";
import React from "react";

import EditTagForm from "@/components/form/EditTagForm";
import Spinner from "@/components/Spinner";
import { api } from "@/utils/api";

export default function EditTrackFormPage() {
  const router = useRouter();
  const tagId = router.query["tagId"];
  const {
    data: tagToEditData,
    isLoading: getTrackByIdIsLoading,
    isSuccess: getTrackByIdIsSuccess,
  } = api.tags.getTagById.useQuery({
    tagId: tagId as string,
  });

  return (
    <main className="container mx-auto py-16">
      <h1 className="text-center text-2xl text-white">Update Track</h1>
      {getTrackByIdIsLoading ? (
        <Spinner />
      ) : getTrackByIdIsSuccess && tagToEditData !== null ? (
        <EditTagForm tagToEditData={tagToEditData} tagId={tagId as string} />
      ) : null}
    </main>
  );
}
