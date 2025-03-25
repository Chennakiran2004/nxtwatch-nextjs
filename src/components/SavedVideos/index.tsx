// "use client";

// import React from "react";
// import Link from "next/link";
// import { useTheme } from "../../context/ThemeContext";
// import { useActiveMenu } from "../../context/ActiveMenuContext";
// import { useSavedVideos } from "../../context/SavedVideosContext";
// import {
//   SavedVideosContainer,
//   Sidebar,
//   MainContent,
//   Header,
//   Logo,
//   UserSection,
//   UserIcon,
//   SidebarLink,
//   ThemeButton,
//   VideoGrid,
//   VideoCard,
//   VideoThumbnail,
//   VideoInfo,
//   ChannelLogo,
//   VideoTitle,
//   ChannelName,
//   ViewCount,
//   NoSavedVideosContainer,
//   NoSavedVideosImage,
//   NoSavedVideosTitle,
//   NoSavedVideosDescription,
// } from "./styledComponents";

// const SavedVideos = () => {
//   const { isDarkTheme, toggleTheme } = useTheme();
//   const { activeMenu, changeActiveMenu } = useActiveMenu();
//   const { savedVideos } = useSavedVideos();

//   return (
//     <SavedVideosContainer theme={isDarkTheme ? "dark" : "light"}>
//       <Sidebar theme={isDarkTheme ? "dark" : "light"}>
//         <Link href="/home" passHref legacyBehavior>
//           <SidebarLink
//             className={activeMenu === "HOME" ? "active" : ""}
//             onClick={() => changeActiveMenu("HOME")}
//             theme={isDarkTheme ? "dark" : "light"}
//           >
//             Home
//           </SidebarLink>
//         </Link>
//         <Link href="/trending" passHref legacyBehavior>
//           <SidebarLink
//             className={activeMenu === "TRENDING" ? "active" : ""}
//             onClick={() => changeActiveMenu("TRENDING")}
//             theme={isDarkTheme ? "dark" : "light"}
//           >
//             Trending
//           </SidebarLink>
//         </Link>
//         <Link href="/gaming" passHref legacyBehavior>
//           <SidebarLink
//             className={activeMenu === "GAMING" ? "active" : ""}
//             onClick={() => changeActiveMenu("GAMING")}
//             theme={isDarkTheme ? "dark" : "light"}
//           >
//             Gaming
//           </SidebarLink>
//         </Link>
//         <Link href="/saved" passHref legacyBehavior>
//           <SidebarLink
//             className={activeMenu === "SAVED" ? "active" : ""}
//             onClick={() => changeActiveMenu("SAVED")}
//             theme={isDarkTheme ? "dark" : "light"}
//           >
//             Saved Videos
//           </SidebarLink>
//         </Link>
//       </Sidebar>
//       <div style={{ flex: 1 }}>
//         <Header theme={isDarkTheme ? "dark" : "light"}>
//           <Logo
//             src={`https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-${
//               isDarkTheme ? "dark" : "light"
//             }-theme-img.png`}
//             alt="nxt watch logo"
//           />
//           <UserSection>
//             <ThemeButton onClick={toggleTheme} type="button" aria-label="theme">
//               {isDarkTheme ? "🌞" : "🌙"}
//             </ThemeButton>
//             <UserIcon
//               src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
//               alt="profile"
//             />
//           </UserSection>
//         </Header>
//         <MainContent theme={isDarkTheme ? "dark" : "light"}>
//           {savedVideos.length === 0 ? (
//             <NoSavedVideosContainer theme={isDarkTheme ? "dark" : "light"}>
//               <NoSavedVideosImage
//                 src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
//                 alt="no saved videos"
//               />
//               <NoSavedVideosTitle theme={isDarkTheme ? "dark" : "light"}>
//                 No saved videos found
//               </NoSavedVideosTitle>
//               <NoSavedVideosDescription theme={isDarkTheme ? "dark" : "light"}>
//                 You can save your videos while watching them
//               </NoSavedVideosDescription>
//             </NoSavedVideosContainer>
//           ) : (
//             <VideoGrid>
//               {savedVideos.map((video) => (
//                 <VideoCard
//                   key={video.id}
//                   theme={isDarkTheme ? "dark" : "light"}
//                 >
//                   <VideoThumbnail src={video.thumbnailUrl} alt={video.title} />
//                   <VideoInfo>
//                     <ChannelLogo
//                       src={video.channel.profileImageUrl}
//                       alt={video.channel.name}
//                     />
//                     <div>
//                       <VideoTitle theme={isDarkTheme ? "dark" : "light"}>
//                         {video.title}
//                       </VideoTitle>
//                       <ChannelName theme={isDarkTheme ? "dark" : "light"}>
//                         {video.channel.name}
//                       </ChannelName>
//                       <ViewCount theme={isDarkTheme ? "dark" : "light"}>
//                         {video.viewCount} views • {video.publishedAt}
//                       </ViewCount>
//                     </div>
//                   </VideoInfo>
//                 </VideoCard>
//               ))}
//             </VideoGrid>
//           )}
//         </MainContent>
//       </div>
//     </SavedVideosContainer>
//   );
// };

// export default SavedVideos;

"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { useSavedVideos } from "@/context/SavedVideosContext";
import {
  SavedVideosContainer,
  MainContent,
  VideoGrid,
  VideoCard,
  VideoThumbnail,
  VideoInfo,
  ChannelLogo,
  VideoTitle,
  ChannelName,
  ViewCount,
  NoSavedVideosContainer,
  NoSavedVideosImage,
  NoSavedVideosTitle,
  NoSavedVideosDescription,
} from "./styledComponents";

const SavedVideos = () => {
  const { isDarkTheme } = useTheme();
  const { savedVideos } = useSavedVideos();

  return (
    <SavedVideosContainer theme={isDarkTheme ? "dark" : "light"}>
      <MainContent theme={isDarkTheme ? "dark" : "light"}>
        {savedVideos.length === 0 ? (
          <NoSavedVideosContainer theme={isDarkTheme ? "dark" : "light"}>
            <NoSavedVideosImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
            <NoSavedVideosTitle theme={isDarkTheme ? "dark" : "light"}>
              No saved videos found
            </NoSavedVideosTitle>
            <NoSavedVideosDescription theme={isDarkTheme ? "dark" : "light"}>
              You can save your videos while watching them
            </NoSavedVideosDescription>
          </NoSavedVideosContainer>
        ) : (
          <VideoGrid>
            {savedVideos.map((video) => (
              <VideoCard key={video.id} theme={isDarkTheme ? "dark" : "light"}>
                <VideoThumbnail src={video.thumbnailUrl} alt={video.title} />
                <VideoInfo>
                  <ChannelLogo
                    src={video.channel.profileImageUrl}
                    alt={video.channel.name}
                  />
                  <div>
                    <VideoTitle theme={isDarkTheme ? "dark" : "light"}>
                      {video.title}
                    </VideoTitle>
                    <ChannelName theme={isDarkTheme ? "dark" : "light"}>
                      {video.channel.name}
                    </ChannelName>
                    <ViewCount theme={isDarkTheme ? "dark" : "light"}>
                      {video.viewCount} views • {video.publishedAt}
                    </ViewCount>
                  </div>
                </VideoInfo>
              </VideoCard>
            ))}
          </VideoGrid>
        )}
      </MainContent>
    </SavedVideosContainer>
  );
};

export default SavedVideos;
