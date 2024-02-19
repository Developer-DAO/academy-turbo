// import { PostCategory } from "@prisma/client";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "ui";
import Link from "next/link";
import { useSession } from "next-auth/react";
// import { useZodForm } from "utils/zod-form";
import {
  // Input,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  // Label,
  // Textarea,
} from "ui";
// import { Controller } from "react-hook-form";
import { api, type RouterOutputs } from "utils/api";
// import { trackCreateSchema } from "@/zodschemas/track.schemas";

// enum PostCategory {
//   BUSINESS,
//   DESIGN,
//   ENGINEERING,
// }

// This schema is reused on the backend

// function CreateTrackForm() {
//   const { data: session } = useSession();

//   const methods = useZodForm({
//     schema: trackCreateSchema,
//   });

//   const utils = api.useContext();
//   const createTrack = api.tracks.create.useMutation({
//     onSettled: async () => {
//       await utils.tracks.invalidate();
//       methods.reset();
//     },
//   });

//   const onSubmit = methods.handleSubmit(
//     (data) => {
//       createTrack.mutate(data);
//     },
//     (e) => {
//       console.log("Whoops... something went wrong!");
//       console.error(e);
//     },
//   );

//   return (
//     <div className="mx-auto max-w-xl space-y-8">
//       <form /* action="" */ className="flex flex-col gap-4" onSubmit={() => onSubmit()}>
//         <div className="space-y-1">
//           <Label htmlFor="name">Title</Label>
//           <Input id="name" className="bg-slate-800" {...methods.register("trackName")} />
//           <p className="font-medium text-red-500">{methods.formState.errors?.trackName?.message}</p>
//         </div>
//         <div className="space-y-1">
//           <Label htmlFor="text">Body</Label>
//           <Textarea id="text" className="bg-slate-800" {...methods.register("trackTitle")} />
//           <p className="font-medium text-red-500">
//             {methods.formState.errors?.trackTitle?.message}
//           </p>
//         </div>
//         {/* <div className="space-y-1">
//           <Label htmlFor="pet">Category</Label>
//           <Controller
//             control={methods.control}
//             name="authors"
//             render={({ field }) => (
//               <Select value={field.value} onValueChange={field.onChange}>
//                 <SelectTrigger className="bg-slate-800">
//                   <SelectValue placeholder="Select authorss" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {/* {Object.entries(PostCategory).map(([key, value]) => (
//                     <SelectItem key={key} value={value}>
//                       {value}
//                     </SelectItem>
//                   ))} */}
//         {/*<SelectItem value={"authors01"}>authors 01</SelectItem>
//                   <SelectItem value={"authors02"}>authors 02</SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           />

//           <p className="font-medium text-red-500">{methods.formState.errors?.authors?.message}</p>
//         </div> */}
//         <Button type="submit" disabled={!session}>
//           {!session ? "Sign in to Post" : createTrack.isLoading ? "Loading..." : "Create Track"}
//         </Button>
//         <p className="font-medium text-red-500">{createTrack.error?.message}</p>
//       </form>
//     </div>
//   );
// }

function TrackCard(props: { track: RouterOutputs["tracks"]["getAll"][number] }) {
  const { data: session } = useSession();
  const { track } = props;
  const utils = api.useContext();
  const deletePost = api.tracks.delete.useMutation({
    onSettled: async () => {
      await utils.tracks.invalidate();
    },
  });
  return (
    <div className="flex flex-row rounded-lg bg-white p-4 transition-all hover:scale-[101%]">
      <Avatar className="mr-2 self-center">
        <AvatarImage src={track.imgPath} alt="track banner" />
        <AvatarFallback>{track.trackName}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <h2 className="text-2xl font-bold">{track.trackName}</h2>
        <p className="mt-2 text-sm">{track.trackTitle}</p>
        <span className="mt-2 text-sm">{track.trackDescription}</span>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex flex-col">
            <Button variant="primary" data-testid={`delete-track-${track.trackTitle}`}>
              Delete
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Track</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete this track? This action cannot be reverted.
          </DialogDescription>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="primary"
                disabled={!session}
                onClick={() => {
                  deletePost.mutate({ trackId: track.id });
                }}
              >
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="ml-2 flex flex-col">
        <Link href={`/admin/tracks/${track.id}`}>
          <Button variant="primary" data-testid={`edit-track-${track.trackTitle}`}>
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function AdminTracksPage() {
  const { data: tracks } = api.tracks.getAll.useQuery();

  return (
    <main className="container mx-auto py-16">
      {/* <CreateTrackForm /> */}
      <div className="mx-auto mt-4 flex max-w-xl flex-col gap-4">
        {tracks?.map((track) => <TrackCard key={track.id} track={track} />)}
      </div>
    </main>
  );
}
