import { zodResolver } from "@hookform/resolvers/zod";
import type { Lessons } from "database";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from "ui";
import type { z } from "zod";

import { api } from "@/utils/api";
import { lessonEditSchema } from "@/zodschemas/lesson.schemas";

type EditLessonFormValues = z.infer<typeof lessonEditSchema>;

interface EditFormProps {
  lessonToEditData: Lessons;
  lessonId: string;
}

function EditLessonForm({ lessonId, lessonToEditData }: EditFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    data: tracksData,
    // isLoading: getTracksDataIsLoading,
    // isSuccess: getTracksDataIsSuccess,
  } = api.tracks.getAll.useQuery();

  const { data: session } = useSession();

  const form = useForm<EditLessonFormValues>({
    resolver: zodResolver(lessonEditSchema),
    defaultValues: { ...lessonToEditData },
  });

  const utils = api.useContext();

  const udpateLesson = api.lessons.udpate.useMutation({
    onSettled: async () => {
      await utils.lessons.invalidate();
    },
    onError: (error) => {
      console.log("request error ", { error });
    },
    onSuccess: async () => {
      await router.push(`/lessons`);
      toast({
        variant: "default",
        title: "Lesson updated",
        description: "Lesson entry was updated successfully",
      });
    },
  });

  const onSubmit = (data: EditLessonFormValues) => {
    try {
      setLoading(true);
      udpateLesson.mutate({ lessonId, ...data });
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
    <>
      <div className="mx-auto max-w-xl space-y-8 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 rounded-md border p-4"
          >
            <FormField
              control={form.control}
              name="lessonTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Title</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      disabled={loading}
                      placeholder="Lesson Title "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="trackId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Track</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full ">
                        <SelectValue defaultValue={field.value} placeholder="Select the Track" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {tracksData?.map((track, idx) => (
                        <SelectItem key={idx} value={track.id}>
                          {track.trackTitle}
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
              name="lessonDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Description</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      disabled={loading}
                      placeholder="Lesson Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quizFileName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson quiz File Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      disabled={loading}
                      placeholder="Lesson's quiz File Name"
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
                  <FormLabel>Lesson Image URL</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      disabled={loading}
                      placeholder="e.g '/newlesson_image.png'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lessonPath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Path</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      disabled={loading}
                      placeholder="Lesson Path"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading} className="outline">
              {!session ? "Sign in error" : udpateLesson.isLoading ? "Loading..." : "Save changes"}
            </Button>
            <p className="font-medium text-red-500">{udpateLesson.error?.message}</p>
          </form>
        </Form>
      </div>
    </>
  );
}

export default EditLessonForm;
