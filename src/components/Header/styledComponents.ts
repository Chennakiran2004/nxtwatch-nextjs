import styled from "styled-components";

interface ThemeProps {
  theme: "light" | "dark";
}

export const HeaderContainer = styled.header<ThemeProps>`
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
  cursor: pointer;
  object-fit: contain;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ThemeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
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

export const LogoutButton = styled.button<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 1px solid
    ${(props) => (props.theme === "dark" ? "#ffffff" : "#3b82f6")};
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#3b82f6")};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.theme === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(59, 130, 246, 0.1)"};
  }
`;

export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

export const NavMobileContainer = styled.nav<{ theme: string }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${(props) =>
    props.theme === "dark" ? "#212121" : "#f4f4f4"};
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const NavLargeContainer = styled(NavMobileContainer)`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

export const HeaderLogoImg = styled.img`
  width: 150px;
  @media screen and (min-width: 768px) {
    width: 20 0px;
  }
`;
export const NavMobileIcons = styled.div`
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const IconButton = styled.button`
  background-color: transparent;
  border: none;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
`;

export const CloseButton = styled.div`
  align-self: flex-end;
  margin-top: 10px;
  margin-right: 10px;
`;
export const LogoutPopupContent = styled.div<{ theme: string }>`
  background-color: ${(props) =>
    props.theme === "dark" ? "#0f0f0f" : "#f9f9f9"};
  border-radius: 8px;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.theme === "dark" ? "#f9f9f9" : "#0f0f0f")};
  cursor: pointer;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

// background-color: ${(props) => (props.outline ? "transparent" : "#3b82f6")};
// color: ${(props) => (props.outline ? "#3b82f6" : "white")};

export const Button = styled.button`
  width: 80px;
  height: 35px;
  margin: 5px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #3b82f6;
  cursor: pointer;
`;
export const ProfileIcon = styled.img`
  width: 25px;
  margin-left: 15px;
  margin-right: 15px;
`;
export const NavLargeIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const LargeLogoutButton = styled.button<{ theme: string }>`
  margin: 0px;
  margin-left: 15px;
  margin-right: 15px;
  height: 25px;
  color: ${(props) => (props.theme === "dark" ? "#f9f9f9" : "#3b82f6")};
  border-color: ${(props) => (props.theme === "dark" ? "#f9f9f9" : "#3b82f6")};
`;
export const MenuPopupMobile = styled.div<{ theme: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: black;
  width: 100%;
  height: 100vh;
  padding-top: 20px;
  background-color: ${(props) =>
    props.theme === "dark" ? "#0f0f0f" : "#f9f9f9"};
`;
export const MenuListMobile = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
