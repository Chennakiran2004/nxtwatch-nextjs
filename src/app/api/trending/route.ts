import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import { Db, Collection } from "mongodb";

interface Video {
  _id: string;
  title: string;
  thumbnail_url: string;
  channel: {
    name: string;
    profile_image_url: string;
  };
  viewCount: string;
  publishedAt: string;
}

export async function GET(): Promise<Response> {
  try {
    const client = await clientPromise;
    const db: Db = client.db("NxtWatch");
    const trendingVideosCollection: Collection<Video> =
      db.collection("Trending");

    // Fetch videos from the "Trending" collection
    const videos = await trendingVideosCollection.find().toArray();

    // Format response data
    const formattedVideos = videos.map((video) => ({
      id: video._id.toString(),
      title: video.title,
      thumbnail_url: video.thumbnail_url,
      channel: {
        name: video.channel.name,
        profile_image_url: video.channel.profile_image_url,
      },
      viewCount: video.viewCount,
      publishedAt: video.publishedAt,
    }));

    return NextResponse.json({ videos: formattedVideos }, { status: 200 });
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    return NextResponse.json(
      { message: "Internal server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
