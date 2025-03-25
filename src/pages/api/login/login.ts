// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "../../../../lib/mongodb";
// import jwt from "jsonwebtoken";

// const SECRET_KEY = process.env.JWT_SECRET as string; // Ensure JWT_SECRET is defined in .env.local

// interface User {
//   username: string;
//   password: string;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   const { username, password } = req.body as User;

//   if (!username || !password) {
//     return res.status(400).json({ message: "Missing credentials" });
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db("MxtWatch");
//     const usersCollection = db.collection<User>("User");

//     let user = await usersCollection.findOne({ username });

//     if (!user) {
//       await usersCollection.insertOne({ username, password });
//       user = await usersCollection.findOne({ username });
//     } else if (user.password !== password) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }

//     const token = jwt.sign({ username: user!.username }, SECRET_KEY, {
//       expiresIn: "1h",
//     });

//     return res.status(200).json({ message: "Login successful", token });
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (error: unknown) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }

import clientPromise from "../../../../lib/mongodb";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { Db, Collection } from "mongodb";

const SECRET_KEY = process.env.JWT_SECRET as string; // Ensure this is set in .env.local

interface User {
  username: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { username, password }: User = req.body;

  try {
    const client = await clientPromise;
    const db: Db = client.db("NxtWatch");
    const usersCollection: Collection<User> = db.collection("User");

    let user = await usersCollection.findOne({ username });
    if (!user) {
      await usersCollection.insertOne({ username, password });
      user = await usersCollection.findOne({ username });
    } else if (!user || user.password !== password) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const token = jwt.sign({ username: user?.username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
}
