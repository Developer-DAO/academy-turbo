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
  Input,
  useToast,
} from "ui";
import type { z } from "zod";

import { api } from "@/utils/api";
import { trackCreateSchema } from "@/zodschemas/track.schemas";

type CreateTrackFormValues = z.infer<typeof trackCreateSchema>;

function CreateTrackForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const { data: session } = useSession();

  const form = useForm<CreateTrackFormValues>({
    resolver: zodResolver(trackCreateSchema),
  });

  const utils = api.useContext();

  const createTrack = api.tracks.create.useMutation({
    onSettled: async () => {
      await utils.tracks.invalidate();
    },
  });

  console.log({ errors: form.formState.errors });

  const onSubmit = async (data: CreateTrackFormValues) => {
    console.log({ data });
    try {
      setLoading(true);
      createTrack.mutate(data);
      // router.refresh(); // needs next 14
      await router.push(`/tracks`);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong. mutate",
        description: "There was a problem with your request. mutate",
      });
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 text-white">
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
                    placeholder="Track Name(internal - not shown)"
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
                    placeholder="Track Image URL"
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
            {!session ? "Sign in error" : createTrack.isLoading ? "Loading..." : "Create Track"}
          </Button>
          <p className="font-medium text-red-500">{createTrack.error?.message}</p>
        </form>
      </Form>
    </div>
  );
}

export default CreateTrackForm;
