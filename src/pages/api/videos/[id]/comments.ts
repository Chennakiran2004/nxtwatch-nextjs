import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/mongodb"; 
import { ObjectId } from "mongodb";

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const { userId, text } = await request.json();

    if (!userId || !text) {
      return NextResponse.json(
        { message: "Missing userId or text" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    // Logic to find the correct collection
    const collections = ["Trending", "Gaming", "Home"];
    let video = null;
    let foundColl = null;
    for (const coll of collections) {
      const objectId = new ObjectId(id);
      video = await db.collection(coll).findOne({ _id: objectId });
      if (video) {
        foundColl = coll;
        break;
      }
    }

    if (!video) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
    }

    const comment = {
      commentId: new Date().toISOString(),
      userId,
      text,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection(foundColl)
      .updateOne({ _id: new ObjectId(id) }, { $push: { comments: comment } });

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
    }

    return NextResponse.json(comment, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error("Error adding comment:");
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id, commentId } = params;
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { message: "Text is required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const result = await db.collection("videos").updateOne(
      { _id: new ObjectId(id), "comments.commentId": commentId },
      {
        $set: {
          "comments.$.text": text,
          "comments.$.updatedAt": new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Comment updated" }, { status: 200 });
  } catch (error) {
    console.error("Error editing comment:", error);
    return NextResponse.json(
      { message: "Failed to update comment" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id, commentId } = params;

    const { db } = await connectToDatabase();

    const result = await db
      .collection("videos")
      .updateOne(
        { _id: new ObjectId(id) },
        { $pull: { comments: { commentId } } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Video or comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { message: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
