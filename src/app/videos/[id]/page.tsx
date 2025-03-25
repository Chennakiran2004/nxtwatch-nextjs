"use client";

import { useParams } from "next/navigation";
import VideoItemDetails from "../../../components/VideoItemDetails";

const VideoDetailsPage = () => {
  const params = useParams();
  const videoId = params?.id as string;

  return <VideoItemDetails key={videoId} />;
};

export default VideoDetailsPage;
