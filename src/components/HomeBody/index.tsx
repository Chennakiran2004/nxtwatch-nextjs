// "use client";

// import React from "react";
// import Link from "next/link";

// import { useTheme } from "../../context/ThemeContext";
// import {
//   VideoCard,
//   VideoThumbnail,
//   VideoInfo,
//   ChannelLogo,
//   VideoTitle,
//   ChannelName,
//   ViewCount,
// } from "./styledComponents";

// interface Video {
//   id: string;
//   title: string;
//   thumbnailUrl: string;
//   channel: {
//     name: string;
//     profileImageUrl: string;
//   };
//   viewCount: string;
//   publishedAt: string;
// }

// interface HomeBodyProps {
//   videoDetails: Video;
// }

// const HomeBody: React.FC<HomeBodyProps> = ({ videoDetails }) => {
//   const { isDarkTheme } = useTheme();

//   return (
//     <VideoCard theme={isDarkTheme ? "dark" : "light"}>
//       <Link href={`/videos/${videoDetails.id}`}>
//         <VideoThumbnail
//           src={videoDetails.thumbnailUrl}
//           alt={videoDetails.title}
//         />
//         <VideoInfo>
//           <ChannelLogo
//             src={videoDetails.channel.profileImageUrl}
//             alt={videoDetails.channel.name}
//           />
//           <div>
//             <VideoTitle theme={isDarkTheme ? "dark" : "light"}>
//               {videoDetails.title}
//             </VideoTitle>
//             <ChannelName theme={isDarkTheme ? "dark" : "light"}>
//               {videoDetails.channel.name}
//             </ChannelName>
//             <ViewCount theme={isDarkTheme ? "dark" : "light"}>
//               {videoDetails.viewCount} views • {videoDetails.publishedAt}
//             </ViewCount>
//           </div>
//         </VideoInfo>
//       </Link>
//     </VideoCard>
//   );
// };

// export default HomeBody;

"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "../../context/ThemeContext";
import {
  VideoCard,
  VideoThumbnail,
  VideoInfo,
  ChannelLogo,
  VideoTitle,
  ChannelName,
  ViewCount,
} from "./styledComponents";

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  channel: {
    name: string;
    profileImageUrl: string;
  };
  viewCount: string;
  publishedAt: string;
}

interface HomeBodyProps {
  videoDetails: Video;
}

const HomeBody: React.FC<HomeBodyProps> = ({ videoDetails }) => {
  const { isDarkTheme } = useTheme();

  return (
    <Link href={`/videos/${videoDetails.id}`} passHref>
      <VideoCard theme={isDarkTheme ? "dark" : "light"}>
        <VideoThumbnail
          src={videoDetails.thumbnailUrl}
          alt={videoDetails.title}
        />
        <VideoInfo>
          <ChannelLogo
            src={videoDetails.channel.profileImageUrl}
            alt={videoDetails.channel.name}
          />
          <div>
            <VideoTitle theme={isDarkTheme ? "dark" : "light"}>
              {videoDetails.title}
            </VideoTitle>
            <ChannelName theme={isDarkTheme ? "dark" : "light"}>
              {videoDetails.channel.name}
            </ChannelName>
            <ViewCount theme={isDarkTheme ? "dark" : "light"}>
              {videoDetails.viewCount} views • {videoDetails.publishedAt}
            </ViewCount>
          </div>
        </VideoInfo>
      </VideoCard>
    </Link>
  );
};

export default HomeBody;
