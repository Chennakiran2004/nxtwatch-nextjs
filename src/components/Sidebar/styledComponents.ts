import styled from "styled-components";

interface ThemeProps {
  theme: "light" | "dark";
}

export const SidebarContainer = styled.div<ThemeProps>`
  width: 250px;
  background-color: ${(props) =>
    props.theme === "dark" ? "#212121" : "#ffffff"};
  border-right: 1px solid
    ${(props) => (props.theme === "dark" ? "#424242" : "#e0e0e0")};
  height: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const NavLink = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 24px;
  text-decoration: none;
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#000000")};
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.theme === "dark" ? "#424242" : "#f1f1f1"};
  }
`;

export const NavText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export const LogoIcons = styled.img`
  width: 40px;
  margin: 0px 6px 0px 0px;
`;

export const ContactUsContainer = styled.div`
  padding: 7px;
`;

export const Text = styled.p<{ theme: string }>`
  font-weight: 600;
  color: ${(props) => (props.theme === "dark" ? "#f4f4f4" : "rgb(33,33,33)")};
`;
