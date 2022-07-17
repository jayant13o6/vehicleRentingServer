import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import postRoutes from "./routes/post.js";
import cors from "cors";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

dotenv.config({ path: "./config.env" });
const connectURL = process.env.DATABASE;
const Port = process.env.Port || 8080;

///connected to mongo
mongoose
  .connect(connectURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(Port, () => {
      console.log("we start express and Mongodb connected");
    })
  ) //listen for request
  .catch((err) => console.log(err));

app.get("/", postRoutes);

app.post("/register", postRoutes);

app.post("/vehicleTypeEntered", postRoutes);

app.post("/vehicleModelEntered", postRoutes);

app.get("/vehicleType", postRoutes);

app.get("/vehicleModel", postRoutes);

app.post("/bookSelectedVehicle", postRoutes);
