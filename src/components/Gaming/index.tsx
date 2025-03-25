"use client";

import React, { useEffect, useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import { IoLogoGameControllerB } from "react-icons/io";
import ThemeContext from "../../Context/ThemeContext";
import GamingBody from "../GamingBody";
import Layout from "../Layout";
import {
  darkThemeFailureImgUrl,
  lightThemeFailureImgUrl,
} from "../../Constants/failureImageUrl";
import getAuthHeaders from "../../Constants/getAuthHeaders";
import { getCookie } from "../../Constants/storageUtilities";

import {
  GamingMainContainer,
  MainBody,
  GamingContainer,
  GamingMenuContainer,
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
}

// Define frontend video details structure
interface VideoDetails {
  id: string;
  thumbnailUrl: string;
  title: string;
  viewCount: string;
}

const Gaming: React.FC = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");
  const [videosList, setVideosList] = useState<VideoDetails[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? "dark" : "light";

  const fetchGamingVideos = async () => {
    setStatus("loading");
    setError(null);

    const jwtToken = getCookie();
    if (!jwtToken) {
      setError("User is not authenticated");
      setStatus("failed");
      return;
    }

    try {
      const url = "https://apis.ccbp.in/videos/gaming";
      const response = await fetch(url, {
        headers: getAuthHeaders(jwtToken),
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch gaming videos");
      }

      const data = await response.json();
      const formattedData: VideoDetails[] = (
        data.videos as VideoAPIResponse[]
      ).map((eachItem) => ({
        id: eachItem.id,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count.toString(), // Convert number to string
      }));

      setVideosList(formattedData);
      setStatus("succeeded");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("failed");
    }
  };

  useEffect(() => {
    fetchGamingVideos();
  }, []);

  const renderUIBasedOnAPIStatus = (): React.ReactElement => {
    switch (status) {
      case "succeeded":
        return (
          <VideosList data-testid="gaming-success-view">
            {videosList.map((eachVideo) => (
              <GamingBody key={eachVideo.id} gameDetails={eachVideo} />
            ))}
          </VideosList>
        );

      case "failed":
        const imgUrl = isDarkTheme
          ? darkThemeFailureImgUrl
          : lightThemeFailureImgUrl;
        return (
          <FailureContainer data-testid="gaming-failure-view">
            <FailureImg src={imgUrl} alt="failure view" />
            <FailureText theme={theme}>Oops! Something Went Wrong</FailureText>
            <FailureText theme={theme}>
              {error ||
                "We are having some trouble completing your request. Please try again."}
            </FailureText>
            <RetryButton type="button" onClick={fetchGamingVideos}>
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
      <GamingMainContainer data-testid="gaming-container" theme={theme}>
        <MainBody>
          <GamingContainer>
            <GamingMenuContainer theme={theme}>
              <IconContainer theme={theme}>
                <IoLogoGameControllerB size={40} color="#ff0b37" />
              </IconContainer>
              <MenuHeading theme={theme}>Gaming</MenuHeading>
            </GamingMenuContainer>
            {renderUIBasedOnAPIStatus()}
          </GamingContainer>
        </MainBody>
      </GamingMainContainer>
    </Layout>
  );
};

export default Gaming;
