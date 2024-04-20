"use client";
import ChannelAvatar from "@/components/ChannelAvatar";
// import { formatRelativeDate } from "@/utils/helpers";

interface VideoProps {
  id?: string;
  title?: string;
  channelName?: string;
  views?: number;
  date?: number;
  video: string;
  channelAvatar?: string;
}

const VideoLink = ({ _title, views = 2, _date, _id, video }: VideoProps) => {
  return (
    <>
      <div className="flex flex-col">
        <iframe src={video} loading="lazy" allowFullScreen={true} className="h-auto w-96" />
        <div>
          <ChannelAvatar image={"/dd_logo_full.svg"} />
        </div>
        <div className="relative flex-row">
          {/* <p className="text-md line-clamp-2 font-bold">{title}</p> */}
          <p className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">{"Developer DAO"}</p>
          <p className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
            {views} {views === 1 ? "view" : "views"} {/*| {formatRelativeDate(new Date(date))} */}
          </p>
        </div>
      </div>
    </>
  );
};

export default VideoLink;
