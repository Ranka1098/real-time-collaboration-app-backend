import login from "../../controller/Authentication/login.js";
import logout from "../../controller/Authentication/logout.js";
import signup from "../../controller/Authentication/signup.js";
import express from "express";

const AuthRouter = express.Router();

AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", logout);

export default AuthRouter;
