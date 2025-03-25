"use client";

import { FC, useContext } from "react";

import Link from "next/link";
import ThemeContext from "../../Context/ThemeContext";
import ActiveMenuContext from "../../Context/activeMenuContext";
import {
  VideoCardContainer,
  Thumbnail,
  ThumbnailText,
  VideoTitle,
  VideoTextContainer,
  VideoDetailsContainer,
  VideoDetailsText,
} from "./styledComponents";

interface GameDetails {
  thumbnailUrl: string;
  viewCount: string;
  title: string;
  id: string;
}

interface GamingCardBodyProps {
  gameDetails: GameDetails;
}

const GamingCardBody: FC<GamingCardBodyProps> = ({ gameDetails }) => {
  const { thumbnailUrl, viewCount, title, id } = gameDetails;

  const themeContext = useContext(ThemeContext);
  const activeMenuContext = useContext(ActiveMenuContext);

  const theme = themeContext.isDarkTheme ? "dark" : "light";

  return (
    <VideoCardContainer data-testid="game-body-details">
      <Link
        href={`/videos/${id}`}
        className="link"
        role="link"
        onClick={() => activeMenuContext.changeActiveMenu("initial")}
      >
        <Thumbnail src={thumbnailUrl} alt="video thumbnail" />
        <ThumbnailText>
          <VideoTextContainer>
            <VideoTitle theme={theme}>{title}</VideoTitle>
            <VideoDetailsContainer>
              <VideoDetailsText>
                {viewCount} Watching Worldwide
              </VideoDetailsText>
            </VideoDetailsContainer>
          </VideoTextContainer>
        </ThumbnailText>
      </Link>
    </VideoCardContainer>
  );
};

export default GamingCardBody;
