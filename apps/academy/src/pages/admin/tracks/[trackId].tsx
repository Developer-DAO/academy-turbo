import { zodResolver } from "@hookform/resolvers/zod";
import type { Tracks } from "database";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Button, Input, Label, Textarea } from "ui";

import Spinner from "@/components/Spinner";
import { api } from "@/utils/api";
import { trackEditSchema } from "@/zodschemas/track.schemas";

interface EditFormProps {
  trackToEditData: Tracks;
}

const EditForm = ({ trackToEditData }: EditFormProps) => {
  const utils = api.useContext();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors, /* isSubmitting, isSubmitted, */ isDirty, isValid },
  } = useForm<Tracks>({
    mode: "onChange",
    resolver: zodResolver(trackEditSchema), // Configuration the validation with the zod schema.
    defaultValues: {
      id: trackToEditData.id ,
      trackName: trackToEditData.trackName ,
      trackTitle: trackToEditData.trackTitle ,
      trackDescription: trackToEditData.trackDescription ,
      imgPath: trackToEditData.imgPath ,
      trackPath: trackToEditData.trackPath ,
      order: trackToEditData.order!,
    },
  });

  const onSubmit = handleSubmit(
    (data) => {
      if (data.order !== null) {
        const { order, ...restData } = data;
        const trackOrderInt = order;
        editTrack.mutate({
          trackId: trackToEditData.id ,
          order: trackOrderInt,
          ...restData,
        });
        return;
      }
    },
    (e) => {
      console.log("Whoops... something went wrong!");
      console.error(e);
    },
  );

  const editTrack = api.tracks.udpate.useMutation({
    onSettled: async () => {
      await utils.tracks.invalidate();
      reset();
    },
  });

  return (
    <form /* action="" */ className="flex flex-col gap-4" onSubmit={void onSubmit}>
      <div className="space-y-1">
        <Label htmlFor="trackName" className="text-white">
          Track Name
        </Label>
        <Input id="trackName" className="bg-slate-800 text-white" {...register("trackName")} />
        <p className="font-medium text-red-500">{errors.trackName?.message}</p>
      </div>
      <div className="space-y-1">
        <Label htmlFor="trackTitle" className="text-white">
          Track Title
        </Label>
        <Input id="trackTitle" className="bg-slate-800 text-white" {...register("trackTitle")} />
        <p className="font-medium text-red-500">{errors.trackTitle?.message}</p>
      </div>
      <div className="space-y-1">
        <Label htmlFor="trackDescription" className="text-white">
          Track Description
        </Label>
        <Textarea
          id="trackDescription"
          className="bg-slate-800 text-white"
          rows={10}
          {...register("trackDescription")}
        />
        <p className="font-medium text-red-500">{errors.trackDescription?.message}</p>
      </div>
      <div className="space-y-1">
        <Label htmlFor="trackPath" className="text-white">
          Track Path
        </Label>
        <Input id="trackPath" className="bg-slate-800 text-white" {...register("trackPath")} />
        <p className="font-medium text-red-500">{errors.trackPath?.message}</p>
      </div>
      <div className="space-y-1">
        <Label htmlFor="imgPath" className="text-white">
          Imgage Banner Path
        </Label>
        <Input id="imgPath" className="bg-slate-800 text-white" {...register("imgPath")} />
        <p className="font-medium text-red-500">{errors.imgPath?.message}</p>
      </div>
      <div className="space-y-1">
        <Label htmlFor="order" className="text-white">
          Order
        </Label>
        <Input
          type="number"
          id="order"
          className="bg-slate-800 text-white"
          {...register("order")}
        />
        <p className="font-medium text-red-500">{errors.order?.message}</p>
      </div>
      {/* <div className="space-y-1">
      <Label htmlFor="pet">Category</Label>
      <Controller
        control={methods.control}
        name="authors"
        render={({ field }) => (
          <Select 
            <SelectTrigger className="bg-slate-800">
              <SelectValue placeholder="Select authorss" />
            </SelectTrigger>
            <SelectContent>
              {/* {Object.entries(PostCategory).map(([key, value]) => (
                <SelectItem key={key} 
                  {value}
                </SelectItem>
              ))} */}
      {/*<SelectItem 
              <SelectItem 
            </SelectContent>
          </Select>
        )}
      />

      <p className="font-medium text-red-500">{methods.errors?.authors?.message}</p>
    </div> */}
      <Button type="submit" disabled={!session && isDirty && isValid}>
        {!session ? "Sign in to Post" : editTrack.isLoading ? "Loading..." : "Edit Track"}
      </Button>
      <p className="font-medium text-red-500">{editTrack.error?.message}</p>
    </form>
  );
};

export default function EditTrackFormPage() {
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
    <div className="mx-auto mt-32 max-w-xl space-y-8">
      {getTrackByIdIsLoading ? (
        <Spinner />
      ) : getTrackByIdIsSuccess && trackToEditData !== null ? (
        <EditForm trackToEditData={trackToEditData} />
      ) : null}
    </div>
  );
}
