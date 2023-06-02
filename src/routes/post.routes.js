import { Router } from "express";
import { sendPost } from "../controllers/post.controllers.js";
import validateAuth from "../middleware/validateAuth.middleware.js";
import validateSchema from "../middleware/validateSchema.middleware.js";
import { postSchema } from "../schemas/post.schema.js";

const postRouter = Router();

postRouter.post("/post", validateSchema(postSchema), validateAuth, sendPost)
postRouter.get("/post")

export default postRouter