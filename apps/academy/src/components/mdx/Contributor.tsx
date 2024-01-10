import { Avatar, AvatarFallback, AvatarImage } from "ui/components/ui/avatar";

import { contributors } from "@/data/contributors";

interface ContributorProps {
  handle: string;
  avatarSize?: string;
}

export function Contributor({ handle }: ContributorProps) {
  const contrib = contributors[handle];
  if (!contrib) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 px-2">
      <div className="w-40 text-center ">
        {contrib.moreInfoUrl !== undefined ? (
          <a href={contrib.moreInfoUrl} className="underline" target="_blank">
            <Avatar className="">
              <AvatarImage src={contrib.avatarUrl} />
              <AvatarFallback>{contrib.displayName}</AvatarFallback>
            </Avatar>
            {/* <Avatar size={avatarSize} name={contrib.displayName} src={contrib.avatarUrl} /> */}
          </a>
        ) : (
          <Avatar className="">
            <AvatarImage src={contrib.avatarUrl} />
            <AvatarFallback>{contrib.displayName}</AvatarFallback>
          </Avatar>
          // <Avatar size={avatarSize} name={contrib.displayName} src={contrib.avatarUrl} />
        )}
      </div>
      <div>
        {contrib.moreInfoUrl !== undefined ? (
          <a href={contrib.moreInfoUrl} className="underline" target="_blank">
            <span className="text-xl">{contrib.displayName}</span>
          </a>
        ) : (
          <span>{contrib.displayName}</span>
        )}

        {contrib.about !== undefined ? (
          <div className="mt-2 max-w-xl">
            <span className="text-xl">{contrib.about}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
