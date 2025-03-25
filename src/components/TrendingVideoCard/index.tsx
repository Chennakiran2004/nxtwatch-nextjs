"use client";

import { FC, useContext } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import ThemeContext from "@/context/ThemeContext";
import ActiveMenuContext from "@/context/ActiveMenuContext";
import {
  VideoCardContainer,
  Thumbnail,
  ChannelLogo,
  ThumbnailText,
  VideoTitle,
  VideoTextContainer,
  VideoDetailsContainer,
  VideoDetailsContainer2,
  VideoDetailsText,
} from "./styledComponents";

interface VideoDetails {
  thumbnailUrl: string;
  channel: {
    name: string;
    profileImageUrl: string;
  };
  viewCount: string;
  title: string;
  id: string;
  publishedAt: string;
}

const TrendingVideoCard: FC<{ videoDetails: VideoDetails }> = ({
  videoDetails,
}) => {
  const { thumbnailUrl, channel, viewCount, title, id, publishedAt } =
    videoDetails;
  const { name, profileImageUrl } = channel;

  let postedAt = "Unknown";
  try {
    const date = new Date(publishedAt);
    if (!isNaN(date.getTime())) {
      postedAt = formatDistanceToNow(date);
      const postedAtList = postedAt.split(" ");
      if (postedAtList.length === 3) {
        postedAtList.shift();
        postedAt = postedAtList.join(" ");
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error("Invalid date:", publishedAt);
  }

  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? "dark" : "light";
  const { changeActiveMenu } = useContext(ActiveMenuContext);

  return (
    <Link
      href={`/videos/${id}`}
      className="link"
      onClick={() => changeActiveMenu("initial")}
    >
      <VideoCardContainer>
        <Thumbnail src={thumbnailUrl} alt="video thumbnail" />
        <ThumbnailText>
          <div>
            <ChannelLogo src={profileImageUrl} alt="channel logo" />
          </div>
          <VideoTextContainer>
            <VideoTitle theme={theme}>{title}</VideoTitle>
            <VideoDetailsContainer>
              <VideoDetailsText>{name}</VideoDetailsText>
              <VideoDetailsContainer2>
                <VideoDetailsText>{viewCount} views</VideoDetailsText>
                <VideoDetailsText>{postedAt} ago</VideoDetailsText>
              </VideoDetailsContainer2>
            </VideoDetailsContainer>
          </VideoTextContainer>
        </ThumbnailText>
      </VideoCardContainer>
    </Link>
  );
};

export default TrendingVideoCard;
