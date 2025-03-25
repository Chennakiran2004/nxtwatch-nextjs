import styled from "styled-components";

interface ThemeProps {
  theme: "light" | "dark";
}

export const HomeBodyContainer = styled.div<ThemeProps>`
  padding: 20px;
  background-color: ${(props) =>
    props.theme === "dark" ? "#181818" : "#f9f9f9"};
  min-height: 100vh;
`;

export const SearchContainer = styled.form`
  display: flex;
  margin-bottom: 20px;
  max-width: 600px;
`;

export const SearchInput = styled.input<ThemeProps>`
  flex: 1;
  padding: 8px 16px;
  border: 1px solid
    ${(props) => (props.theme === "dark" ? "#424242" : "#e0e0e0")};
  border-radius: 4px 0 0 4px;
  font-size: 16px;
  background-color: ${(props) =>
    props.theme === "dark" ? "#212121" : "#ffffff"};
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#000000")};

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.theme === "dark" ? "#606060" : "#1976d2"};
  }
`;

export const SearchButton = styled.button<ThemeProps>`
  padding: 8px 24px;
  background-color: ${(props) =>
    props.theme === "dark" ? "#424242" : "#f0f0f0"};
  border: 1px solid
    ${(props) => (props.theme === "dark" ? "#424242" : "#e0e0e0")};
  border-left: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#000000")};

  &:hover {
    background-color: ${(props) =>
      props.theme === "dark" ? "#606060" : "#e0e0e0"};
  }
`;

export const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;

export const VideoCard = styled.div<ThemeProps>`
  background-color: ${(props) =>
    props.theme === "dark" ? "#212121" : "#ffffff"};
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const VideoThumbnail = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
`;

export const VideoInfo = styled.div`
  padding: 12px;
  display: flex;
  gap: 12px;
`;

export const ChannelLogo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

export const VideoTitle = styled.h3<ThemeProps>`
  margin: 0 0 8px;
  font-size: 16px;
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#000000")};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ChannelName = styled.p<ThemeProps>`
  margin: 0 0 4px;
  font-size: 14px;
  color: ${(props) => (props.theme === "dark" ? "#aaaaaa" : "#606060")};
`;

export const ViewCount = styled.p<ThemeProps>`
  margin: 0;
  font-size: 14px;
  color: ${(props) => (props.theme === "dark" ? "#aaaaaa" : "#606060")};
`;

export const LoadingContainer = styled.div<ThemeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 18px;
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#000000")};
  background-color: ${(props) =>
    props.theme === "dark" ? "#181818" : "#f9f9f9"};

  &::after {
    content: "";
    width: 24px;
    height: 24px;
    margin-left: 12px;
    border: 3px solid
      ${(props) => (props.theme === "dark" ? "#ffffff" : "#000000")};
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  padding: 20px;
  text-align: center;
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#000000")};
  background-color: ${(props) =>
    props.theme === "dark" ? "#181818" : "#f9f9f9"};

  p {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

export const NoResultsContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  padding: 20px;
  text-align: center;
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#000000")};
  background-color: ${(props) =>
    props.theme === "dark" ? "#181818" : "#f9f9f9"};

  img {
    width: 100%;
    max-width: 400px;
    margin-bottom: 24px;
  }

  p {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

export const RetryButton = styled.button`
  padding: 10px 24px;
  font-size: 16px;
  color: #ffffff;
  background-color: #3b82f6;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;
