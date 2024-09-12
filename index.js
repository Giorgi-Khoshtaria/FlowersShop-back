/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogroutes.js";
import flowersRoutes from "./routes/flowersRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

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

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

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
app.use("/api/blogs", blogRoutes);
app.use("/api/flowers", flowersRoutes);
app.use("/api/reviews", commentRoutes);
