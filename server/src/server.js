import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    await app.listen({
      port: process.env.PORT || 5000,
      host: "0.0.0.0",
    });

    console.log("Server running");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

startServer();