import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect("mongodb://localhost:27017/blog")
      .then(() => console.log("Connected to MongoDB..."))
      .catch((err) => console.error("Could not connect to MongoDB:", err));
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
