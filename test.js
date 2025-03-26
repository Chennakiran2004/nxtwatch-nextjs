import { MongoClient } from "mongodb";

// const MONGO_URI =
//   "mongodb+srv://kirankumarchenna2004:kiran2004@cluster.25vj9.mongodb.net/NxtWatch?retryWrites=true&w=majority";

const MONGO_URI =
  "mongodb+srv://kirankumarchenna2004:ckk1234@cluster0.0t0lt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&authSource=admin";

const DB_NAME = "NxtWatch";

async function testDBConnection() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const db = client.db(DB_NAME);
    const collections = await db.listCollections().toArray();
    console.log(
      "Collections:",
      collections.map((c) => c.name)
    );

    await client.close();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
  }
}

testDBConnection();
