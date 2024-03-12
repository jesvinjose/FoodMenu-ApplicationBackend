import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
dotenv.config();
import bodyParser from "body-parser";
import userRoute from "./routes/userRoutes.js";
import adminRoute from "./routes/adminRoutes.js";

const app = express();

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoute);
app.use("/admin", adminRoute);

const port = process.env.PORT;

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
