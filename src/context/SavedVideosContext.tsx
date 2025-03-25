"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  channel: {
    name: string;
    profileImageUrl: string;
  };
  viewCount: string;
  publishedAt: string;
}

interface SavedVideosContextType {
  savedVideos: Video[];
  addSavedVideo: (video: Video) => void;
  removeSavedVideo: (videoId: string) => void;
  isVideoSaved: (videoId: string) => boolean;
}

const SavedVideosContext = createContext<SavedVideosContextType>({
  savedVideos: [],
  addSavedVideo: () => {},
  removeSavedVideo: () => {},
  isVideoSaved: () => false,
});

interface SavedVideosProviderProps {
  children: ReactNode;
}

export const SavedVideosProvider = ({ children }: SavedVideosProviderProps) => {
  const [savedVideos, setSavedVideos] = useState<Video[]>([]);

  const addSavedVideo = (video: Video) => {
    setSavedVideos((prev) => {
      if (!prev.find((v) => v.id === video.id)) {
        return [...prev, video];
      }
      return prev;
    });
  };

  const removeSavedVideo = (videoId: string) => {
    setSavedVideos((prev) => prev.filter((video) => video.id !== videoId));
  };

  const isVideoSaved = (videoId: string) => {
    return savedVideos.some((video) => video.id === videoId);
  };

  return (
    <SavedVideosContext.Provider
      value={{ savedVideos, addSavedVideo, removeSavedVideo, isVideoSaved }}
    >
      {children}
    </SavedVideosContext.Provider>
  );
};

export const useSavedVideos = () => {
  const context = useContext(SavedVideosContext);
  if (context === undefined) {
    throw new Error("useSavedVideos must be used within a SavedVideosProvider");
  }
  return context;
};

export default SavedVideosContext;
