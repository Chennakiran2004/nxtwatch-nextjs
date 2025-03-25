"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import {
  AiFillHome,
  AiFillFire,
  AiFillSave,
  AiFillThunderbolt,
} from "react-icons/ai";

import {
  SidebarContainer,
  NavLink,
  NavText,
  IconWrapper,
} from "./styledComponents";

const Sidebar = () => {
  const { isDarkTheme } = useTheme();
  const pathname = usePathname();
  const theme = isDarkTheme ? "dark" : "light";

  const navItems = [
    { path: "/", icon: <AiFillHome />, text: "Home" },
    { path: "/trending", icon: <AiFillFire />, text: "Trending" },
    { path: "/gaming", icon: <AiFillThunderbolt />, text: "Gaming" },
    { path: "/saved", icon: <AiFillSave />, text: "Saved Videos" },
  ];

  return (
    <SidebarContainer theme={theme}>
      {navItems.map(({ path, icon, text }) => {
        const isActive = pathname === path;

        return (
          <Link key={path} href={path}>
            <NavLink
              theme={theme}
              style={{
                backgroundColor: isActive
                  ? isDarkTheme
                    ? "#424242"
                    : "#f1f1f1"
                  : "transparent",
              }}
              aria-current={isActive ? "page" : undefined}
            >
              <IconWrapper>{icon}</IconWrapper>
              <NavText>{text}</NavText>
            </NavLink>
          </Link>
        );
      })}
    </SidebarContainer>
  );
};

export default Sidebar;
