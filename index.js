/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// Connect to MongoDB
console.log("MongoUrl:", process.env.REACT_APP_MONGO_URL);
mongoose
  .connect(process.env.REACT_APP_MONGO_URL)
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
