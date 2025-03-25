import styled from "styled-components";

interface ThemeProps {
  theme: "light" | "dark";
}

export const HomeMainContainer = styled.div<ThemeProps>`
  background-color: ${(props) =>
    props.theme === "dark" ? "#181818" : "#f9f9f9"};
  min-height: 100vh;
`;

export const HomeContainer = styled.div<ThemeProps>`
  width: 100%;
  background-color: ${(props) =>
    props.theme === "dark" ? "#0f0f0f" : "#f9f9f9"};
  padding: 16px;
`;

export const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  max-width: 600px;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input<ThemeProps>`
  flex: 1;
  height: 36px;
  padding: 8px 16px;
  border: 1px solid
    ${(props) => (props.theme === "dark" ? "#424242" : "#e2e8f0")};
  border-radius: 2px 0 0 2px;
  outline: none;
  background-color: transparent;
  color: ${(props) => (props.theme === "dark" ? "#f8fafc" : "#231f20")};

  &:focus {
    border-color: ${(props) =>
      props.theme === "dark" ? "#475569" : "#3b82f6"};
  }
`;

export const SearchButton = styled.button<ThemeProps>`
  height: 36px;
  width: 70px;
  background-color: ${(props) =>
    props.theme === "dark" ? "#424242" : "#f1f5f9"};
  border: 1px solid
    ${(props) => (props.theme === "dark" ? "#424242" : "#e2e8f0")};
  border-left: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) =>
      props.theme === "dark" ? "#475569" : "#e2e8f0"};
  }
`;

export const GetPremium = styled.div`
  background-image: url("https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png");
  background-size: cover;
  padding: 24px;
  margin-bottom: 20px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  align-self: flex-end;
  cursor: pointer;
  padding: 8px;
`;

export const BannerLogo = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

export const BannerText = styled.p`
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

export const GetItButton = styled.button`
  background-color: transparent;
  color: #1e293b;
  border: 1px solid #1e293b;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;

export const VideosList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;

export const NoVideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 20px;
  text-align: center;
`;

export const NoVideosImg = styled.img`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;

export const FailureText = styled.p<ThemeProps>`
  font-size: 16px;
  color: ${(props) => (props.theme === "dark" ? "#f8fafc" : "#231f20")};
  margin: 8px 0;
`;

export const RetryButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 4px;
  font-weight: 500;
  margin-top: 16px;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
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

export const MainBody = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    height: 90vh;
  }
`;

export const SidebarContainer = styled.div<{ theme: string }>`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
`;
