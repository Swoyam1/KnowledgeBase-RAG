import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import documentUploadRoutes from "./routes/db.js";
import queryRoutes from "./routes/query.js";
import db from "./db/MongoDB.js";

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB...");
});

const app = express();

app.use(express.json());
app.use("/document", documentUploadRoutes);
app.use("/query", queryRoutes);

app.listen(7000, () => {
  console.log("server running on port 7000...");
});
