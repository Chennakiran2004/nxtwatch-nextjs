"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import {
  HeaderContainer,
  Logo,
  UserSection,
  ThemeButton,
  LogoutButton,
  ProfileImage,
} from "@/components/Header/styledComponents";

const Header = () => {
  const router = useRouter();
  const { isDarkTheme, toggleTheme } = useTheme();
  const theme = isDarkTheme ? "dark" : "light";

  const handleLogout = () => {
    document.cookie =
      "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  return (
    <HeaderContainer theme={theme}>
      <Logo
        src={
          isDarkTheme
            ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
            : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        }
        alt="website logo"
        onClick={() => router.push("/")}
      />
      <UserSection>
        <ThemeButton onClick={toggleTheme} aria-label="theme toggle">
          {isDarkTheme ? <FaSun color="#ffffff" /> : <FaMoon />}
        </ThemeButton>
        <ProfileImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
        />
        <LogoutButton onClick={handleLogout} theme={theme}>
          <FiLogOut />
          <span>Logout</span>
        </LogoutButton>
      </UserSection>
    </HeaderContainer>
  );
};

export default Header;
