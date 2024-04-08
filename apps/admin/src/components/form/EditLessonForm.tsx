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

const creators = [
  { id: "asd01", name: "creator01" },
  { id: "asd02", name: "creator02" },
  { id: "asd03", name: "creator03" },
];

function EditLessonForm({ lessonId, lessonToEditData }: EditFormProps) {
  const [loading, setLoading] = useState(false);
  const [showAddContributionFormVisible, setShowAddContributionFormVisible] = useState(false);

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

  const handleAddNewContributionEntry = () => {
    setShowAddContributionFormVisible(true);
  };

  const handleCloseNewContributionForm = () => {
    setShowAddContributionFormVisible(false);
  };

  return (
    <div className="mx-auto max-w-xl space-y-8 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 text-white">
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
                    <SelectTrigger className="w-full bg-white text-black">
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

          <div className="rounded-sm bg-white p-2">
            <div className="flex items-start justify-between ">
              <h2 className="text-black">
                <u>Contributions</u>
              </h2>
              {!showAddContributionFormVisible ? (
                <Button type="button" onClick={handleAddNewContributionEntry}>
                  Add
                </Button>
              ) : (
                <Button type="button" onClick={handleCloseNewContributionForm}>
                  Close
                </Button>
              )}
            </div>
            <div className={showAddContributionFormVisible ? "block" : "hidden"}>
              <FormField
                control={form.control}
                name="contributor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contributor</FormLabel>
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
                            placeholder="Select contributor"
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {creators.map((creator, idx) => (
                          <SelectItem key={idx} value={creator.id}>
                            {creator.name}
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
                            placeholder="Select type of contribution"
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {["Author", "Co-author", "Editor"].map((typeOfContribution, idx) => (
                          <SelectItem key={idx} value={typeOfContribution}>
                            {typeOfContribution}
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
                name="timestamp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select date</FormLabel>
                    <FormControl>
                      <Input type="date" className="text-black" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {!session ? "Sign in error" : udpateLesson.isLoading ? "Loading..." : "Save changes"}
          </Button>
          <p className="font-medium text-red-500">{udpateLesson.error?.message}</p>
        </form>
      </Form>
    </div>
  );
}

export default EditLessonForm;
