import clientPromise from "../../../../lib/mongodb";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { Db, Collection } from "mongodb";

const SECRET_KEY = process.env.JWT_SECRET as string; // Ensure this is set in .env.local

interface User {
  username: string;
  password: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { username, password }: User = await req.json();
    const client = await clientPromise;
    const db: Db = client.db("NxtWatch");
    const usersCollection: Collection<User> = db.collection("User");

    // Check if user exists
    let user = await usersCollection.findOne({ username });

    if (!user) {
      // Create a new user
      await usersCollection.insertOne({ username, password });
      user = await usersCollection.findOne({ username }); // Fetch newly created user
    } else if (user.password !== password) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
