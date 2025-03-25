import { MongoClient } from "mongodb";

const uri: string = process.env.MONGODB_URI || "";
console.log(uri);
const options = {
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

// eslint-disable-next-line prefer-const
clientPromise = global._mongoClientPromise;

export default clientPromise;
