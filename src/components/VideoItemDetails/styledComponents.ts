// import styled from "styled-components";

// export const MainBody = styled.div`
//   @media screen and (min-width: 768px) {
//     display: flex;
//     flex-direction: row;
//   }
// `;

// export const SidebarContainer = styled.div<{ theme: string }>`
//   display: none;
//   @media screen and (min-width: 768px) {
//     display: block;
//   }
// `;

// export const FailureContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   text-align: center;
//   align-items: center;
//   margin: 10px;
//   min-height: 50vh;
//   justify-content: center;
// `;

// export const FailureImg = styled.img`
//   width: 80%;
//   padding-top: 15px;

//   @media screen and (min-width: 768px) {
//     width: 50%;
//   }
// `;

// export const FailureText = styled.h1<{ theme: string }>`
//   margin: 0px;
//   padding: 5px;
//   color: ${(props) => (props.theme === "dark" ? "#f9f9f9" : "#181818")};
// `;
// export const RetryButton = styled.button`
//   background-color: #4f46e5;
//   color: white;
//   border: none;
//   width: 100px;
//   height: 30px;
//   margin-top: 10px;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #3c3a9e;
//   }
// `;
// export const LoaderContainer = styled.div`
//   text-align: center;
//   min-height: 50vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// export const VideoItemDetailsContainer = styled.div<{ theme: string }>`
//   height: 92vh;
//   overflow-x: auto;
//   background-color: ${(props) =>
//     props.theme === "dark" ? "#0f0f0f" : "#f9f9f9"};
//   flex-grow: 1;
//   padding: 15px;
//   padding-bottom: 30px;
//   @media screen and (max-width: 768px) {
//     min-height: 92vh;
//   }
// `;

// export const VideoDetailContainer = styled.div`
//   height: 100%;
// `;

// export const PlayerContainer = styled.div`
//   height: 40%;
//   @media screen and (min-width: 768px) {
//     height: 70%;
//     padding: 20px 20px 0px 20px;
//   }
// `;

// export const VideoTextContainer = styled.div`
//   margin: 0px;
//   @media screen and (min-width: 768px) {
//     padding-left: 20px;
//   }
// `;

// export const VideoTitle = styled.p<{ theme: string }>`
//   margin: 0px;
//   margin-top: 8px;
//   font-weight: 500;
//   font-size: 20px;
//   font-family: Roboto;
//   color: ${(props) => (props.theme === "dark" ? "white" : "#0f0f0f")};
//   @media screen and (min-width: 768px) {
//     font-size: 24px;
//   }
// `;

// export const LikesAndViewsContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding-top: 10px;
//   color: #475569;
//   @media screen and (min-width: 768px) {
//     flex-direction: row;
//     align-items: center;
//     justify-content: space-between;
//     padding-right: 20px;
//   }
// `;

// export const ViewsAndPostedContainer = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// export const ViewsText = styled.p`
//   margin: 0px 10px 0px 0px;
// `;
// export const Button = styled.button<{ theme: string }>`
//   background-color: transparent;
//   border: none;
//   font-weight: 500;
//   font-family: Roboto;
//   font-size: 14px;
//   padding: 0px;
//   margin-right: 10px;
//   margin-top: 10px;
//   padding-bottom: 10px;
//   color: ${(props) => (props.theme === "active" ? "#2563eb" : "#64748b")};
// `;

// export const ChannelLogo = styled.img`
//   width: 50px;
// `;
// export const ChannelDetails = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   padding-top: 10px;
// `;

// export const ChannelDetailsText = styled.p<{ theme: string }>`
//   margin: 0px;
//   padding-left: 15px;
//   color: ${(props) => (props.theme === "dark" ? "white" : "#0f0f0f")};
// `;
// export const ChannelDetailsText2 = styled(ChannelDetailsText)`
//   color: #64748b;
// `;
// export const VideoDescriptionText = styled.p<{ theme: string }>`
//   color: ${(props) => (props.theme === "dark" ? "white" : "#0f0f0f")};
//   margin-bottom: 20px;
// `;

import styled from "styled-components";

export const MainBody = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
  }
`;

export const SidebarContainer = styled.div<{ theme: string }>`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
`;

export const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin: 10px;
  min-height: 50vh;
  justify-content: center;
`;

export const FailureImg = styled.img`
  width: 80%;
  padding-top: 15px;

  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

export const FailureText = styled.h1<{ theme: string }>`
  margin: 0px;
  padding: 5px;
  color: ${(props) => (props.theme === "dark" ? "#E0E0E0" : "#181818")};
`;

export const RetryButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  width: 120px;
  height: 35px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #3c3a9e;
  }
`;

export const LoaderContainer = styled.div`
  text-align: center;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const VideoItemDetailsContainer = styled.div<{ theme: string }>`
  height: 92vh;
  overflow-x: auto;
  background-color: ${(props) =>
    props.theme === "dark" ? "#181818" : "#ffffff"};
  color: ${(props) => (props.theme === "dark" ? "#E0E0E0" : "#000000")};
  flex-grow: 1;
  padding: 20px;
  padding-bottom: 30px;
  @media screen and (max-width: 768px) {
    min-height: 92vh;
  }
`;

export const VideoDetailContainer = styled.div`
  height: 100%;
`;

export const PlayerContainer = styled.div`
  height: 45%;
  @media screen and (min-width: 768px) {
    height: 65%;
    padding: 20px 20px 0px 20px;
  }
`;

export const VideoTextContainer = styled.div`
  margin: 0px;
  @media screen and (min-width: 768px) {
    padding-left: 20px;
  }
`;

export const VideoTitle = styled.p<{ theme: string }>`
  margin: 0px;
  margin-top: 8px;
  font-weight: bold;
  font-size: 22px;
  font-family: "Roboto", sans-serif;
  color: ${(props) => (props.theme === "dark" ? "#FFFFFF" : "#202020")};
  @media screen and (min-width: 768px) {
    font-size: 26px;
  }
`;

export const LikesAndViewsContainer = styled.div<{ theme: string }>`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  color: ${(props) => (props.theme === "dark" ? "#B0B0B0" : "#475569")};
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;
  }
`;

export const ViewsAndPostedContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ViewsText = styled.p<{ theme: string }>`
  margin: 0px 10px 0px 0px;
  color: ${(props) => (props.theme === "dark" ? "#E0E0E0" : "#333333")};
`;

export const Button = styled.button<{ theme: string }>`
  background-color: transparent;
  border: none;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  padding: 5px 10px;
  margin-right: 10px;
  margin-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${(props) => (props.theme === "active" ? "#2563eb" : "#888888")};

  &:hover {
    color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#333333")};
  }
`;

export const ChannelLogo = styled.img`
  width: 50px;
  border-radius: 50%;
`;

export const ChannelDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
`;

export const ChannelDetailsText = styled.p<{ theme: string }>`
  margin: 0px;
  padding-left: 15px;
  font-weight: bold;
  color: ${(props) => (props.theme === "dark" ? "#FFFFFF" : "#202020")};
`;

export const ChannelDetailsText2 = styled(ChannelDetailsText)`
  color: ${(props) => (props.theme === "dark" ? "#B0B0B0" : "#64748b")};
  font-weight: normal;
`;

export const VideoDescriptionText = styled.p<{ theme: string }>`
  color: ${(props) => (props.theme === "dark" ? "#E0E0E0" : "#333333")};
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.5;
`;
