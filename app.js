import express from "express";
import connectDB from "./src/database/database.js";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./src/routes/Authentication_Router/authRouter.js";
dotenv.config();
// server created
const app = express();
//expess.json()
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

// routes
app.use("/", AuthRouter);

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
