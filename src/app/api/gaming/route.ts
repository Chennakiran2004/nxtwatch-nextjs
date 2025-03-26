import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import { Db, Collection } from "mongodb";

// Define the Video interface
interface Video {
  _id: string;
  title: string;
  thumbnail_url: string;
  viewCount: string;
  publishedAt: string;
}

export async function GET(): Promise<Response> {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db: Db = client.db("NxtWatch");
    const gamingCollection: Collection<Video> = db.collection("Gaming");

    // Fetch videos from the "Gaming" collection
    const videos = await gamingCollection.find().toArray();

    // Format response data
    const formattedVideos = videos.map((video) => ({
      id: video._id.toString(),
      title: video.title,
      thumbnail_url: video.thumbnail_url,
      viewCount: video.viewCount,
      publishedAt: video.publishedAt,
    }));

    return NextResponse.json({ videos: formattedVideos }, { status: 200 });
  } catch (error) {
    console.error("Error fetching gaming videos:", error);
    return NextResponse.json(
      { message: "Internal server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
