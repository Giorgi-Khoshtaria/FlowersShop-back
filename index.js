/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
// Connect to MongoDB
const mongourl = process.env.REACT_APP_MONGO_URL;
// console.log("MongoUrl:", mongourl);
mongoose
  .connect(mongourl)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});

app.use("/api/user", authRouter);
app.use("/api/user", userRouter);
