import { Router } from "express";
import { getUserPosts } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get("/user/:id", getUserPosts);

export default userRouter;