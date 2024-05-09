import { zodResolver } from "@hookform/resolvers/zod";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from "ui";
import type { z } from "zod";

import { api } from "@/utils/api";
import { addAuthorSchema } from "@/zodschemas/authorOnTrack.schemas";

type AddAuthorToTrackFormValues = z.infer<typeof addAuthorSchema>;

function AddAuthorToTrackForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const trackId = router.query["trackId"];
  const {
    data: contributorsData,
    // isLoading: getcontributorsDataIsLoading,
    // isSuccess: getcontributorsDataIsSuccess,
  } = api.contributors.getAllAvailableByTrackId.useQuery({
    trackId: trackId as string,
  });

  const { data: session } = useSession();

  const form = useForm<AddAuthorToTrackFormValues>({
    resolver: zodResolver(addAuthorSchema),
  });

  const utils = api.useContext();

  const createContributorOnTrack = api.contributorsOnTracks.create.useMutation({
    onSettled: async () => {
      await utils.contributorsOnTracks.invalidate();
      await utils.tracks.invalidate();
    },
    onError: (error) => {
      console.log("request error ", { error });
    },
    onSuccess: async () => {
      await router.push(`/tracks/${trackId as string}/author`);
      toast({
        variant: "default",
        title: "New author assigned",
        description: "The new author entry was created successfully",
      });
    },
  });

  const onSubmit = (data: AddAuthorToTrackFormValues) => {
    try {
      setLoading(true);
      if (trackId !== undefined && typeof trackId === "string") {
        createContributorOnTrack.mutate({ trackId, ...data });
      }
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
            name="contributorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select author</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-white text-black">
                      <SelectValue defaultValue={field.value} placeholder="Select author" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {contributorsData?.map((contributor, idx) => (
                      <SelectItem key={idx} value={contributor.id}>
                        {contributor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="typeOfContribution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type of contribution</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-white text-black">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select the type of contribution"
                      />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {["author", "coauthor", "editor"].map((type, idx) => (
                      <SelectItem key={idx} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="outline">
            {!session
              ? "Sign in error"
              : createContributorOnTrack.isLoading
              ? "Loading..."
              : "Save changes"}
          </Button>
          <p className="font-medium text-red-500">{createContributorOnTrack.error?.message}</p>
        </form>
      </Form>
    </div>
  );
}

export default AddAuthorToTrackForm;
