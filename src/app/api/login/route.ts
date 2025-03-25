export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const response = await fetch("https://apis.ccbp.in/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Login failed" }), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// app/api/login/route.ts
// import { NextResponse } from "next/server";
// import { connectToDatabase } from "../../../../lib/mongodb";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const SECRET_KEY = process.env.JWT_SECRET || "mySecretKey";

// export async function POST(request: Request) {
//   try {
//     console.log("Connecting to DB...");
//     const { username, password } = await request.json();
//     console.log("Received username input:", username);

//     const db = await connectToDatabase();
//     const usersCollection = db.collection("User");

//     // Log all users in the collection
//     const allUsers = await usersCollection.find().toArray();
//     console.log("Users in DB:", allUsers);

//     // 🔹 Log the query and use case-insensitive search
//     const searchQuery = {
//       username: { $regex: `^${username}$`, $options: "i" },
//     };
//     console.log("Searching with query:", searchQuery);

//     const user = await usersCollection.findOne(searchQuery);
//     console.log("Found user:", user);

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 401 });
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     console.log("Password comparison result:", isPasswordCorrect);

//     if (!isPasswordCorrect) {
//       return NextResponse.json(
//         { error: "Invalid credentials" },
//         { status: 401 }
//       );
//     }

//     const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
//       expiresIn: "30d",
//     });
//     console.log("Generated token:", token);

//     return NextResponse.json({ jwt_token: token }, { status: 200 });
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
