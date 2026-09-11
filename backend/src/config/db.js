import mongoose from "mongoose";

async function connectDatabase() {
  const mongoUri =
    process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error(
      "MONGO_URI is not configured."
    );
  }

  mongoose.set(
    "bufferCommands",
    false
  );

  try {
    const connection =
      await mongoose.connect(
        mongoUri,
        {
          serverSelectionTimeoutMS:
            20000,
        }
      );

    console.log(
      `MongoDB connected: ${connection.connection.host}`
    );

    console.log(
      `MongoDB database: ${connection.connection.name}`
    );

    return connection;
  } catch (error) {
    console.error(
      "MongoDB connection failed:",
      error.message
    );

    throw error;
  }
}

export default connectDatabase;