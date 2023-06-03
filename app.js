import express from "express";
import mongoose from "mongoose";
import Airport from "./models/Airport.js";
import postRoute from "./routes/Post.js";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();

app.use(cookieParser());
app.use(express.json());

app.use("/posts", postRoute);
app.use("/", authRoute);

const mongooseURI = process.env.MONGO;

const connection = () => {
  mongoose.connect(mongooseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });

  async function registerAirport() {
    Airport.deleteMany({})
      .then((result) => {
        if (result.deletedCount > 0) {
          console.log("Airport deleted successfully");
        } else {
          console.log("Airport not found");
        }
      })
      .catch((error) => {
        console.error("Error deleting airport:", error);
      });
  }
  registerAirport();
};
const port = 3030;

app.listen(port, () => {
  connection();
  console.log("running");
});
