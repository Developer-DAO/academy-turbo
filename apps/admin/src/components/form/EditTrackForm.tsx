import { zodResolver } from "@hookform/resolvers/zod";
import type { Tracks } from "database";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  useToast,
} from "ui";
import type { z } from "zod";

import { api } from "@/utils/api";
import { trackEditSchema } from "@/zodschemas/track.schemas";

type EditTrackFormFormValues = z.infer<typeof trackEditSchema>;

interface EditFormProps {
  trackToEditData: Tracks;
  trackId: string;
}

function EditTrackFormForm({ trackId, trackToEditData }: EditFormProps) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const { data: session } = useSession();

  const form = useForm<EditTrackFormFormValues>({
    resolver: zodResolver(trackEditSchema),
    defaultValues: { ...trackToEditData },
  });

  const utils = api.useContext();

  const udpateTrack = api.tracks.udpate.useMutation({
    onSettled: async () => {
      await utils.tracks.invalidate();
    },
    onError: (error) => {
      console.log("request error ", { error });
    },
    onSuccess: async () => {
      await router.push(`/tracks`);
      toast({
        variant: "default",
        title: "Track updated",
        description: "Track entry was updated successfully",
      });
    },
  });

  const onSubmit = (data: EditTrackFormFormValues) => {
    try {
      setLoading(true);
      udpateTrack.mutate({ trackId, ...data });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-8 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
          <FormField
            control={form.control}
            name="trackTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Track Title</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Track Title "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trackName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Track Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Track Name (internal - not shown)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trackDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Track Description</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Track Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imgPath"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Track Image URL</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="e.g '/newtrack_image.png'"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trackPath"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Track Path</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Track Path"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {!session ? "Sign in error" : udpateTrack.isLoading ? "Loading..." : "Save changes"}
          </Button>
          <p className="font-medium text-red-500">{udpateTrack.error?.message}</p>
        </form>
      </Form>
    </div>
  );
}

export default EditTrackFormForm;
