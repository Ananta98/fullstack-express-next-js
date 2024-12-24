import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routes/route";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/users", userRouter);

const port = 3002;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
