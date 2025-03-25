"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type MenuType = "HOME" | "TRENDING" | "GAMING" | "SAVED" | "initial";

interface ActiveMenuContextType {
  activeMenu: MenuType;
  changeActiveMenu: (menu: MenuType) => void;
}

const ActiveMenuContext = createContext<ActiveMenuContextType>({
  activeMenu: "HOME",
  changeActiveMenu: () => {},
});

interface ActiveMenuProviderProps {
  children: ReactNode;
}

export const ActiveMenuProvider = ({ children }: ActiveMenuProviderProps) => {
  const [activeMenu, setActiveMenu] = useState<MenuType>("HOME");

  const changeActiveMenu = (menu: MenuType) => {
    setActiveMenu(menu);
  };

  return (
    <ActiveMenuContext.Provider value={{ activeMenu, changeActiveMenu }}>
      {children}
    </ActiveMenuContext.Provider>
  );
};

export const useActiveMenu = () => {
  const context = useContext(ActiveMenuContext);
  if (context === undefined) {
    throw new Error("useActiveMenu must be used within an ActiveMenuProvider");
  }
  return context;
};

export default ActiveMenuContext;
