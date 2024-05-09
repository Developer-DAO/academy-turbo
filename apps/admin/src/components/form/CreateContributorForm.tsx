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
import { contributorCreateSchema } from "@/zodschemas/contributor.schemas";

type CreateContributorFormValues = z.infer<typeof contributorCreateSchema>;

function CreateContributorForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const { data: session } = useSession();

  const form = useForm<CreateContributorFormValues>({
    resolver: zodResolver(contributorCreateSchema),
  });

  const utils = api.useContext();

  const createContributor = api.contributors.create.useMutation({
    onSettled: async () => {
      await utils.contributors.invalidate();
    },
    onError: (error) => {
      console.log("request error ", { error });
    },
    onSuccess: async () => {
      await router.push(`/contributors`); // TODO: redirect to the tracks page where the user clicked the button
      toast({
        variant: "default",
        title: "New contributor created",
        description: "The new contributor entry was created successfully",
      });
    },
  });

  const onSubmit = (data: CreateContributorFormValues) => {
    try {
      setLoading(true);
      createContributor.mutate(data);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="text-black" disabled={loading} placeholder="Name " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar path</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Avatar path"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company position</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Company position"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter handle</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Twitter handle (without @)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {!session
              ? "Sign in error"
              : createContributor.isLoading
              ? "Loading..."
              : "Save changes"}
          </Button>
          <p className="font-medium text-red-500">{createContributor.error?.message}</p>
        </form>
      </Form>
    </div>
  );
}

export default CreateContributorForm;
