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

import { Layout } from "@/components/Layout";
import { api } from "@/utils/api";
import { tagCreateSchema } from "@/zodschemas/tag.schemas";

type CreateTagFormValues = z.infer<typeof tagCreateSchema>;

function CreateNewTagPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const { data: session } = useSession();

  const form = useForm<CreateTagFormValues>({
    resolver: zodResolver(tagCreateSchema),
  });

  const utils = api.useContext();

  const createTag = api.tags.create.useMutation({
    onSettled: async () => {
      await utils.tags.invalidate();
    },
  });

  const onSubmit = async (data: CreateTagFormValues) => {
    try {
      setLoading(true);
      createTag.mutate(data);
      await router.push(`/tags`);
      toast({
        variant: "default",
        title: "New tag created",
        description: "The new tag entry was created successfully",
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
    <Layout>
      <section className="container mx-auto py-16">
        <h1 className="text-center text-2xl ">Create New Tag</h1>
        <div className="mx-auto max-w-xl space-y-8 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
              <FormField
                control={form.control}
                name="tagName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag Name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        disabled={loading}
                        placeholder="Tag Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tagDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag Description</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        disabled={loading}
                        placeholder="Tag Description (internal - not shown)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {!session ? "Sign in error" : createTag.isLoading ? "Loading..." : "Create Tag"}
              </Button>
              <p className="font-medium text-red-500">{createTag.error?.message}</p>
            </form>
          </Form>
        </div>
      </section>
    </Layout>
  );
}

export default CreateNewTagPage;
