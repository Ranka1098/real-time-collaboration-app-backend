import express from "express";
import connectDB from "./src/database/database.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// server created
const app = express();
//expess.json()
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("database connection established");
      console.log(`server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error to connect", error);
  });
