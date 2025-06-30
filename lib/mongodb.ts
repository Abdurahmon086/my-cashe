import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    console.log("MISSING MONGODB_URL");
    return;
  }

  if (isConnected) {
    console.log("[MongoDB] Existing connection reused");
    return;
  }

  try {
    const options: ConnectOptions = {
      dbName: "my-cashe",
      autoCreate: true,
    };

    await mongoose.connect(process.env.MONGODB_URL, options);
    isConnected = true;
    console.log("[MongoDB] Connected successfully");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log("[MongoDB] Connection failed");
  }
};
