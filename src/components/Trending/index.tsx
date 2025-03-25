"use client";

import React, { useEffect, useState, useContext } from "react";
import { AiFillFire } from "react-icons/ai";
import { ThreeDots } from "react-loader-spinner";
import ThemeContext from "../../Context/ThemeContext";
import TrendingVideoCard from "../TrendingVideoCard";
import Layout from "../Layout";
import {
  darkThemeFailureImgUrl,
  lightThemeFailureImgUrl,
} from "../../Constants/failureImageUrl";
import getAuthHeaders from "../../Constants/getAuthHeaders"; // Import helper function
import { getCookie } from "../../Constants/storageUtilities"; // Function to get JWT token

import {
  TrendingMainContainer,
  MainBody,
  TrendingContainer,
  TrendingMenuContainer,
  IconContainer,
  MenuHeading,
  LoaderContainer,
  VideosList,
  FailureContainer,
  FailureText,
  FailureImg,
  RetryButton,
} from "./styledComponents";

// Define API response structure
interface VideoAPIResponse {
  id: string;
  thumbnail_url: string;
  title: string;
  view_count: number;
  published_at: string;
  channel: {
    name: string;
    profile_image_url: string;
  };
}

// Define frontend video details structure
interface VideoDetails {
  id: string;
  thumbnailUrl: string;
  title: string;
  viewCount: string;
  publishedAt: string;
  channel: {
    name: string;
    profileImageUrl: string;
  };
}

const Trending: React.FC = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");
  const [videosList, setVideosList] = useState<VideoDetails[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? "dark" : "light";

  const fetchTrendingVideos = async () => {
    setStatus("loading");
    setError(null);

    const jwtToken = getCookie(); // Get JWT token
    if (!jwtToken) {
      setError("User is not authenticated");
      setStatus("failed");
      return;
    }

    try {
      const url = "https://apis.ccbp.in/videos/trending";
      const response = await fetch(url, {
        headers: getAuthHeaders(jwtToken), // Pass JWT token in headers
        method: "GET",
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Unauthorized: Please log in again.");
        } else {
          setError("Failed to fetch trending videos");
        }
        setStatus("failed");
        return;
      }

      const data = await response.json();
      const formattedData: VideoDetails[] = (
        data.videos as VideoAPIResponse[]
      ).map((eachItem) => ({
        id: eachItem.id,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count.toString(),
        publishedAt: eachItem.published_at,
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
      }));

      setVideosList(formattedData);
      setStatus("succeeded");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("failed");
    }
  };

  useEffect(() => {
    fetchTrendingVideos();
  }, []);

  const renderUIBasedOnAPIStatus = (): React.ReactElement => {
    switch (status) {
      case "succeeded":
        return (
          <VideosList data-testid="trending-success-view">
            {videosList.map((eachVideo) => (
              <TrendingVideoCard key={eachVideo.id} videoDetails={eachVideo} />
            ))}
          </VideosList>
        );

      case "failed":
        const imgUrl = isDarkTheme
          ? darkThemeFailureImgUrl
          : lightThemeFailureImgUrl;
        return (
          <FailureContainer data-testid="trending-failure-view">
            <FailureImg src={imgUrl} alt="failure view" />
            <FailureText theme={theme}>Oops! Something Went Wrong</FailureText>
            <FailureText theme={theme}>
              {error ||
                "We are having some trouble completing your request. Please try again."}
            </FailureText>
            <RetryButton type="button" onClick={fetchTrendingVideos}>
              Retry
            </RetryButton>
          </FailureContainer>
        );

      case "loading":
        return (
          <LoaderContainer data-testid="loader">
            <ThreeDots
              color={isDarkTheme ? "#ffffff" : "#000000"}
              height={50}
              width={50}
            />
          </LoaderContainer>
        );

      default:
        return <></>;
    }
  };

  return (
    <Layout>
      <TrendingMainContainer data-testid="trending-container" theme={theme}>
        <MainBody>
          <TrendingContainer>
            <TrendingMenuContainer theme={theme}>
              <IconContainer theme={theme}>
                <AiFillFire size={40} color="#ff0b37" />
              </IconContainer>
              <MenuHeading theme={theme}>Trending</MenuHeading>
            </TrendingMenuContainer>
            {renderUIBasedOnAPIStatus()}
          </TrendingContainer>
        </MainBody>
      </TrendingMainContainer>
    </Layout>
  );
};

export default Trending;
