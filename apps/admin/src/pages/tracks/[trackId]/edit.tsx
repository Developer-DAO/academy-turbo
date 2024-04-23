import { useRouter } from "next/router";

import EditTrackFormForm from "@/components/form/EditTrackForm";
import { Layout } from "@/components/Layout";
import Spinner from "@/components/Spinner";
import { api } from "@/utils/api";

export default function EditTrackPage() {
  const router = useRouter();
  const trackId = router.query["trackId"];
  const {
    data: trackToEditData,
    isLoading: getTrackByIdIsLoading,
    isSuccess: getTrackByIdIsSuccess,
  } = api.tracks.getTrackById.useQuery({
    trackId: trackId as string,
  });

  return (
    <Layout>
      <h1 className="text-center text-2xl ">Update Track</h1>
      {getTrackByIdIsLoading ? (
        <Spinner />
      ) : getTrackByIdIsSuccess && trackToEditData !== null ? (
        <EditTrackFormForm trackToEditData={trackToEditData} trackId={trackId as string} />
      ) : null}
    </Layout>
  );
}
