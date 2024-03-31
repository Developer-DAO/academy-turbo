import { zodResolver } from "@hookform/resolvers/zod";
import type { Tags } from "database";
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
import { tagEditSchema } from "@/zodschemas/tag.schemas";

type EditTagFormValues = z.infer<typeof tagEditSchema>;

interface EditFormProps {
  tagToEditData: Tags;
  tagId: string;
}

function EditTagForm({ tagId, tagToEditData }: EditFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const { data: session } = useSession();

  const form = useForm<EditTagFormValues>({
    resolver: zodResolver(tagEditSchema),
    defaultValues: { ...tagToEditData },
  });

  const utils = api.useContext();

  const editTag = api.tags.udpate.useMutation({
    onSettled: async () => {
      await utils.tags.invalidate();
    },
  });

  const onSubmit = async (data: EditTagFormValues) => {
    try {
      setLoading(true);
      if (tagId !== undefined && typeof tagId === "string") {
        editTag.mutate({ tagId, ...data });
        await router.push(`/tags`);
        toast({
          variant: "default",
          title: "New tag created",
          description: "The new tag entry was created successfully",
        });
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 text-white">
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
            {!session ? "Sign in error" : editTag.isLoading ? "Loading..." : "Create Tag"}
          </Button>
          <p className="font-medium text-red-500">{editTag.error?.message}</p>
        </form>
      </Form>
    </div>
  );
}

export default EditTagForm;
