import { Router } from "express";

import { getUserList, getUserPosts } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get("/user/:id", getUserPosts);
userRouter.post("/search", getUserList);

export default userRouter;