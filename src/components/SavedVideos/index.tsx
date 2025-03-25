"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { useSavedVideos } from "@/context/SavedVideosContext";
import {
  SavedVideosContainer,
  MainContent,
  VideoGrid,
  VideoCard,
  VideoThumbnail,
  VideoInfo,
  ChannelLogo,
  VideoTitle,
  ChannelName,
  ViewCount,
  NoSavedVideosContainer,
  NoSavedVideosImage,
  NoSavedVideosTitle,
  NoSavedVideosDescription,
} from "./styledComponents";

const SavedVideos = () => {
  const { isDarkTheme } = useTheme();
  const { savedVideos } = useSavedVideos();

  return (
    <SavedVideosContainer theme={isDarkTheme ? "dark" : "light"}>
      <MainContent theme={isDarkTheme ? "dark" : "light"}>
        {savedVideos.length === 0 ? (
          <NoSavedVideosContainer theme={isDarkTheme ? "dark" : "light"}>
            <NoSavedVideosImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
            <NoSavedVideosTitle theme={isDarkTheme ? "dark" : "light"}>
              No saved videos found
            </NoSavedVideosTitle>
            <NoSavedVideosDescription theme={isDarkTheme ? "dark" : "light"}>
              You can save your videos while watching them
            </NoSavedVideosDescription>
          </NoSavedVideosContainer>
        ) : (
          <VideoGrid>
            {savedVideos.map((video) => (
              <VideoCard key={video.id} theme={isDarkTheme ? "dark" : "light"}>
                <VideoThumbnail src={video.thumbnailUrl} alt={video.title} />
                <VideoInfo>
                  <ChannelLogo
                    src={video.channel.profileImageUrl}
                    alt={video.channel.name}
                  />
                  <div>
                    <VideoTitle theme={isDarkTheme ? "dark" : "light"}>
                      {video.title}
                    </VideoTitle>
                    <ChannelName theme={isDarkTheme ? "dark" : "light"}>
                      {video.channel.name}
                    </ChannelName>
                    <ViewCount theme={isDarkTheme ? "dark" : "light"}>
                      {video.viewCount} views • {video.publishedAt}
                    </ViewCount>
                  </div>
                </VideoInfo>
              </VideoCard>
            ))}
          </VideoGrid>
        )}
      </MainContent>
    </SavedVideosContainer>
  );
};

export default SavedVideos;
