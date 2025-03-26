// // import clientPromise from "../../../../../lib/mongodb";
// // import { NextRequest, NextResponse } from "next/server";
// // import { Db, Collection } from "mongodb";

// interface Video {
//   _id: string | ObjectId;
//   title: string;
//   thumbnail_url: string;
//   channel: {
//     name: string;
//     profile_image_url: string;
//   };
//   viewCount: string;
//   publishedAt: string;
// }

// // export async function GET(
// //   req: NextRequest,
// //   { params }: { params: { id: string } }
// // ) {
// //   try {
// //     const client = await clientPromise;
// //     const db: Db = client.db("NxtWatch");
// //     const collections = ["Home", "Gaming", "Trending"];

// //     let video = null;

// //     // Loop through each collection and search for the video
// //     for (const collectionName of collections) {
// //       const collection: Collection<Video> = db.collection(collectionName);
// //       video = await collection.findOne({ _id: params.id });

// //       if (video) break; // If video is found, exit loop
// //     }

// //     if (!video) {
// //       return NextResponse.json({ message: "Video not found" }, { status: 404 });
// //     }

// //     // Format response data
// //     const formattedVideo = {
// //       id: video._id,
// //       title: video.title,
// //       thumbnail_url: video.thumbnail_url,
// //       channel: {
// //         name: video.channel.name,
// //         profile_image_url: video.channel.profile_image_url,
// //       },
// //       viewCount: video.viewCount,
// //       publishedAt: video.publishedAt,
// //     };

// //     return NextResponse.json({ video: formattedVideo }, { status: 200 });
// //   } catch (error) {
// //     console.error("Error fetching video details:", error);
// //     return NextResponse.json(
// //       { message: "Internal server error", error: (error as Error).message },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { Collection, Db, ObjectId } from "mongodb";
// import { NextRequest, NextResponse } from "next/server";
// import clientPromise from "../../../../../lib/mongodb";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const client = await clientPromise;
//     const db: Db = client.db("NxtWatch");
//     const collections = ["Home", "Gaming", "Trending"];

//     let video = null;

//     // Validate and convert params.id to ObjectId
//     if (!params.id) {
//       return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
//     }

//     const videoId = new ObjectId(params.id); // Convert string ID to ObjectId

//     // Loop through collections to find the video
//     for (const collectionName of collections) {
//       const collection: Collection<Video> = db.collection(collectionName);
//       //   video = await collection.findOne({ _id: videoId });
//       video = await collection.findOne({ _id: videoId });

//       if (video) break;
//     }

//     if (!video) {
//       return NextResponse.json({ message: "Video not found" }, { status: 404 });
//     }

//     // Format response data
//     const formattedVideo = {
//       id: video._id.toString(),
//       title: video.title,
//       thumbnail_url: video.thumbnail_url,
//       channel: {
//         name: video.channel.name,
//         profile_image_url: video.channel.profile_image_url,
//       },
//       viewCount: video.viewCount,
//       publishedAt: video.publishedAt,
//     };

//     return NextResponse.json({ video: formattedVideo }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching video details:", error);
//     return NextResponse.json(
//       { message: "Internal server error", error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// ------------------------Comments------------------------------

import { Collection, Db, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../../lib/mongodb";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db: Db = client.db("NxtWatch");
    const collections = ["Home", "Gaming", "Trending"];

    if (!params.id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const videoId = new ObjectId(params.id);
    let video = null;

    for (const collectionName of collections) {
      const collection: Collection = db.collection(collectionName);
      video = await collection.findOne({ _id: videoId });
      if (video) break;
    }

    if (!video) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
    }

    const formattedVideo = {
      id: video._id.toString(),
      title: video.title,
      thumbnail_url: video.thumbnail_url,
      channel: {
        name: video.channel.name,
        profile_image_url: video.channel.profile_image_url,
      },
      viewCount: video.viewCount,
      publishedAt: video.publishedAt,
      comments: video.comments || [], // Include comments, default to empty array if not present
    };

    return NextResponse.json({ video: formattedVideo }, { status: 200 });
  } catch (error) {
    console.error("Error fetching video details:", error);
    return NextResponse.json(
      { message: "Internal server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
