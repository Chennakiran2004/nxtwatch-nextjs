// import { NextResponse } from "next/server";
// import clientPromise from "../../../../lib/mongodb";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const SECRET_KEY = process.env.JWT_SECRET as string; // Ensure it's set in .env.local
// console.log("JWT Secret:", process.env.JWT_SECRET);

// export async function POST(req: Request) {
//   try {
//     const { username, password } = await req.json();

//     if (!username || !password) {
//       return NextResponse.json(
//         { message: "Missing credentials" },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db("NxtWatch");
//     const usersCollection = db.collection("User");

//     // Find user in DB
//     const user = await usersCollection.findOne({ username });

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     // Compare password with hashed version
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { message: "Invalid username or password" },
//         { status: 401 }
//       );
//     }

//     // Generate JWT token
//     const token = jwt.sign({ username: user.username }, SECRET_KEY, {
//       expiresIn: "1h",
//     });

//     return NextResponse.json(
//       { message: "Login successful", token },
//       { status: 200 }
//     );
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

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
