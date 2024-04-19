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
import { addTagSchema } from "@/zodschemas/tagOnLesson.schemas";

type AddTagToLessonFormValues = z.infer<typeof addTagSchema>;

function AddTagToLessonForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const lessonId = router.query["lessonId"];
  const { data: tagsData } = api.tags.getAllAvailableByLessonId.useQuery({
    lessonId: lessonId as string,
  });

  const { data: session } = useSession();

  const form = useForm<AddTagToLessonFormValues>({
    resolver: zodResolver(addTagSchema),
  });

  const utils = api.useContext();

  const createTagOnLesson = api.tagsOnLessons.create.useMutation({
    onSettled: async () => {
      await utils.tagsOnLessons.invalidate();
      await utils.lessons.invalidate();
      await utils.tags.invalidate();
    },
    onError: (error) => {
      console.log("request error ", { error });
    },
    onSuccess: async () => {
      await router.push(`/lessons/${lessonId as string}/tags`);
      toast({
        variant: "default",
        title: "New Tag added",
        description: "The new tag entry was created successfully",
      });
    },
  });

  const onSubmit = (data: AddTagToLessonFormValues) => {
    try {
      setLoading(true);
      if (lessonId !== undefined && typeof lessonId === "string") {
        createTagOnLesson.mutate({ lessonId, ...data });
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
            name="tagId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select tag</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-white text-black">
                      <SelectValue defaultValue={field.value} placeholder="Select tag" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {tagsData?.map((tag, idx) => (
                      <SelectItem key={idx} value={tag.id}>
                        {tag.tagName}
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
              : createTagOnLesson.isLoading
              ? "Loading..."
              : "Save changes"}
          </Button>
          <p className="font-medium text-red-500">{createTagOnLesson.error?.message}</p>
        </form>
      </Form>
    </div>
  );
}

export default AddTagToLessonForm;
