"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { ThreeDots } from "react-loader-spinner";
import { IoMdClose } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { useTheme } from "@/context/ThemeContext";
import { getCookie, getAuthHeaders } from "@/utils/auth";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import HomeBody from "@/components/HomeBody";
import {
  HomeMainContainer,
  HomeContainer,
  SearchContainer,
  SearchInput,
  SearchButton,
  GetPremium,
  CloseButton,
  BannerLogo,
  BannerText,
  GetItButton,
  LoaderContainer,
  VideosList,
  NoVideosContainer,
  NoVideosImg,
  FailureText,
  RetryButton,
  MainBody,
  SidebarContainer,
} from "@/components/Home/styledComponents";

interface ApiVideo {
  id: string;
  title: string;
  thumbnail_url: string;
  channel: {
    name: string;
    profile_image_url: string;
  };
  view_count: string;
  published_at: string;
}

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

interface ApiResponse {
  videos: ApiVideo[];
  total: number;
}

const Home = () => {
  const router = useRouter();
  const { isDarkTheme } = useTheme();
  const [isPopup, setIsPopup] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async (search: string = "") => {
    try {
      setIsLoading(true);
      setError(null);

      const jwtToken = getCookie();
      console.log("JWT Token:", jwtToken);

      if (!jwtToken) {
        console.log("No JWT token found, redirecting to login");
        router.push("/login");
        return;
      }

      // const url = `https://apis.ccbp.in/videos/all?search=${search}`;
      const url = `/api/home?search=${search}`;

      console.log("Fetching from URL:", url);

      const headers = getAuthHeaders(jwtToken);
      console.log("Request headers:", headers);

      const response = await fetch(url, {
        headers,
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText);
        throw new Error(
          `Failed to fetch videos: ${response.status} ${errorText}`
        );
      }

      const data: ApiResponse = await response.json();
      console.log("API Response:", data);

      const formattedData = data.videos.map((video: ApiVideo) => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
        },
        viewCount: video.view_count,
        publishedAt: video.published_at,
      }));

      setVideos(formattedData);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const onClickCloseBanner = () => {
    setIsPopup(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVideos(searchInput);
  };

  const theme = isDarkTheme ? "dark" : "light";

  const renderContent = () => {
    if (isLoading) {
      return <LoaderContainer>Loading...</LoaderContainer>;
    }

    if (error) {
      return (
        <NoVideosContainer>
          <NoVideosImg
            src={
              isDarkTheme
                ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
                : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
            }
            alt="failure view"
          />
          <FailureText theme={theme}>Oops! Something Went Wrong</FailureText>
          <FailureText theme={theme}>Please try again later</FailureText>
          <RetryButton onClick={() => fetchVideos(searchInput)}>
            Retry
          </RetryButton>
        </NoVideosContainer>
      );
    }

    return (
      <HomeContainer theme={theme}>
        {isPopup && (
          <GetPremium>
            <CloseButton onClick={onClickCloseBanner}>
              <IoMdClose size={20} />
            </CloseButton>
            <BannerLogo
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="nxt watch logo"
            />
            <BannerText>
              Buy Nxt Watch Premium prepaid plans with UPI
            </BannerText>
            <GetItButton>GET IT NOW</GetItButton>
          </GetPremium>
        )}
        <SearchContainer onSubmit={handleSearch}>
          <SearchInput
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            theme={theme}
          />
          <SearchButton type="submit" theme={theme}>
            <BsSearch size={16} />
          </SearchButton>
        </SearchContainer>
        {videos.length === 0 ? (
          <NoVideosContainer>
            <NoVideosImg
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <FailureText theme={theme}>No Search results found</FailureText>
            <FailureText theme={theme}>
              Try different key words or remove search filter
            </FailureText>
            <RetryButton onClick={() => fetchVideos("")}>Retry</RetryButton>
          </NoVideosContainer>
        ) : (
          <VideosList>
            {videos.map((video) => (
              <HomeBody key={video.id} videoDetails={video} />
            ))}
          </VideosList>
        )}
      </HomeContainer>
    );
  };

  return (
    <HomeMainContainer theme={theme}>
      <Header />
      <MainBody>
        <SidebarContainer theme={theme}>
          <Sidebar />
        </SidebarContainer>
        {renderContent()}
      </MainBody>
    </HomeMainContainer>
  );
};

export default Home;
