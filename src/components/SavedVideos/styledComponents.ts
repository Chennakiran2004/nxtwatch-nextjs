import styled from "styled-components";

interface ThemeProps {
  theme: "light" | "dark";
}

export const SavedVideosContainer = styled.div<ThemeProps>`
  display: flex;
  min-height: 100vh;
  background-color: ${(props) =>
    props.theme === "dark" ? "#181818" : "#f9f9f9"};
`;

export const Sidebar = styled.nav<ThemeProps>`
  width: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${(props) =>
    props.theme === "dark" ? "#212121" : "#ffffff"};
  border-right: 1px solid
    ${(props) => (props.theme === "dark" ? "#424242" : "#e0e0e0")};
`;

export const MainContent = styled.main<ThemeProps>`
  flex: 1;
  padding: 20px;
  background-color: ${(props) =>
    props.theme === "dark" ? "#181818" : "#f9f9f9"};
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#000000")};
`;

export const Header = styled.header<ThemeProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: ${(props) =>
    props.theme === "dark" ? "#212121" : "#ffffff"};
  border-bottom: 1px solid
    ${(props) => (props.theme === "dark" ? "#424242" : "#e0e0e0")};
`;

export const Logo = styled.img`
  height: 30px;
  object-fit: contain;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const UserIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const SidebarLink = styled.a<ThemeProps>`
  text-decoration: none;
  padding: 10px;
  border-radius: 8px;
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#000000")};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.theme === "dark" ? "#424242" : "#e0e0e0"};
  }

  &.active {
    background-color: ${(props) =>
      props.theme === "dark" ? "#424242" : "#e0e0e0"};
    font-weight: bold;
  }
`;

export const ThemeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
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

export const NoSavedVideosContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 20px;
  text-align: center;
  background-color: ${(props) =>
    props.theme === "dark" ? "#181818" : "#f9f9f9"};
`;

export const NoSavedVideosImage = styled.img`
  width: 100%;
  max-width: 400px;
  margin-bottom: 32px;
`;

export const NoSavedVideosTitle = styled.h2<ThemeProps>`
  font-size: 24px;
  margin: 0 0 16px;
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#000000")};
`;

export const NoSavedVideosDescription = styled.p<ThemeProps>`
  font-size: 16px;
  margin: 0;
  color: ${(props) => (props.theme === "dark" ? "#aaaaaa" : "#606060")};
`;
