"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { BiLike, BiDislike } from "react-icons/bi";
import { RiMenuAddLine } from "react-icons/ri";
import ReactPlayer from "react-player";
// import { ThreeDots } from "react-loader-spinner";
import { useTheme } from "../../context/ThemeContext";
import { useSavedVideos } from "../../context/SavedVideosContext";
import { getCookie, getAuthHeaders } from "../../utils/auth";
import {
  VideoItemDetailsContainer,
  PlayerContainer,
  VideoDetailContainer,
  VideoTextContainer,
  VideoTitle,
  ViewsAndPostedContainer,
  LikesAndViewsContainer,
  ViewsText,
  Button,
  ChannelLogo,
  ChannelDetails,
  ChannelDetailsText,
  ChannelDetailsText2,
  VideoDescriptionText,
  LoaderContainer,
  FailureContainer,
  FailureImg,
  FailureText,
  RetryButton,
} from "./styledComponents";
import Layout from "../Layout";

interface VideoDetails {
  id: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  title: string;
  videoUrl: string;
  viewCount: string;
  channel: {
    name: string;
    profileImageUrl: string;
    subscriberCount: string;
  };
}

const VideoItemDetails = () => {
  const params = useParams();
  const id = params?.id as string;
  const { isDarkTheme } = useTheme();
  const { addSavedVideo, removeSavedVideo, isVideoSaved } = useSavedVideos();

  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const fetchVideoDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const jwtToken = getCookie();
      if (!jwtToken) {
        throw new Error("User is not authenticated");
      }

      const url = `https://apis.ccbp.in/videos/${id}`;
      const response = await fetch(url, {
        headers: getAuthHeaders(jwtToken),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch video details");
      }

      const data = await response.json();
      const videoData = data.video_details;

      setVideoDetails({
        id: videoData.id,
        description: videoData.description,
        publishedAt: videoData.published_at,
        thumbnailUrl: videoData.thumbnail_url,
        title: videoData.title,
        videoUrl: videoData.video_url,
        viewCount: videoData.view_count.toString(),
        channel: {
          name: videoData.channel.name,
          profileImageUrl: videoData.channel.profile_image_url,
          subscriberCount: videoData.channel.subscriber_count.toString(),
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideoDetails();
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    setIsLiked(false);
  };

  const handleSave = () => {
    if (videoDetails) {
      if (isVideoSaved(videoDetails.id)) {
        removeSavedVideo(videoDetails.id);
      } else {
        addSavedVideo(videoDetails);
      }
    }
  };

  if (isLoading) {
    return (
      <LoaderContainer className="loader-container" data-testid="loader">
        Loading...
      </LoaderContainer>
    );
  }

  if (error || !videoDetails) {
    return (
      <FailureContainer>
        <FailureImg
          src={
            isDarkTheme
              ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
              : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          }
          alt="failure view"
        />
        <FailureText theme={isDarkTheme ? "dark" : "light"}>
          Oops! Something Went Wrong
        </FailureText>
        <RetryButton type="button" onClick={fetchVideoDetails}>
          Retry
        </RetryButton>
      </FailureContainer>
    );
  }

  const postedAt = formatDistanceToNow(new Date(videoDetails.publishedAt));
  const theme = isDarkTheme ? "dark" : "light";

  return (
    <VideoItemDetailsContainer data-testid="videoItemDetails" theme={theme}>
      <Layout>
        <VideoDetailContainer>
          <PlayerContainer>
            <ReactPlayer
              url={videoDetails.videoUrl}
              controls
              width="100%"
              height="100%"
            />
          </PlayerContainer>
          <VideoTextContainer>
            <VideoTitle theme={theme}>{videoDetails.title}</VideoTitle>
            <LikesAndViewsContainer>
              <ViewsAndPostedContainer>
                <ViewsText>{videoDetails.viewCount} views</ViewsText>
                <ViewsText>{postedAt} ago</ViewsText>
              </ViewsAndPostedContainer>
              <div>
                <Button
                  type="button"
                  theme={isLiked ? "active" : "not-active"}
                  onClick={handleLike}
                  data-testid="likeButton"
                >
                  <BiLike size={20} style={{ paddingTop: "6px" }} />
                  Like
                </Button>
                <Button
                  type="button"
                  theme={isDisliked ? "active" : "not-active"}
                  onClick={handleDislike}
                  data-testid="dislikeButton"
                >
                  <BiDislike size={20} style={{ paddingTop: "6px" }} />
                  Dislike
                </Button>
                <Button
                  type="button"
                  theme={
                    isVideoSaved(videoDetails.id) ? "active" : "not-active"
                  }
                  onClick={handleSave}
                  data-testid="saveButton"
                >
                  <RiMenuAddLine size={20} style={{ paddingTop: "6px" }} />
                  {isVideoSaved(videoDetails.id) ? "Saved" : "Save"}
                </Button>
              </div>
            </LikesAndViewsContainer>
            <hr />
            <ChannelDetails>
              <ChannelLogo
                src={videoDetails.channel.profileImageUrl}
                alt="channel logo"
              />
              <div>
                <ChannelDetailsText theme={theme}>
                  {videoDetails.channel.name}
                </ChannelDetailsText>
                <ChannelDetailsText2>
                  {videoDetails.channel.subscriberCount} subscribers
                </ChannelDetailsText2>
              </div>
            </ChannelDetails>
            <VideoDescriptionText theme={theme}>
              {videoDetails.description}
            </VideoDescriptionText>
          </VideoTextContainer>
        </VideoDetailContainer>
      </Layout>
    </VideoItemDetailsContainer>
  );
};

export default VideoItemDetails;
