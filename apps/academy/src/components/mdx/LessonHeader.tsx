import NextLink from "next/link";
import { Icons } from "ui";

interface LessonHeaderProps {
  title: string;
  discussionUrl?: string;
}

const DEFAULT_DISCUSSION_URL = "https://developerdao.peeranha.io/";

export function LessonHeader({ title, discussionUrl }: LessonHeaderProps) {
  const forumLink = discussionUrl !== undefined ? discussionUrl : DEFAULT_DISCUSSION_URL;

  return (
    <div>
      <div>
        <h1
          className="color-yellow-300 mt-6 text-3xl font-bold"
          // letterSpacing={-0.025}
        >
          {title}
        </h1>
      </div>
      {forumLink && (
        <div className="my-6 flex max-w-xl flex-row">
          <div>
            <Icons.help_circle className="h-8 w-8" />
          </div>
          <div>
            If you get stuck or have questions please visit our{" "}
            <NextLink href={forumLink} className="underline">
              forum
            </NextLink>
            .
          </div>
        </div>
      )}
    </div>
  );
}
