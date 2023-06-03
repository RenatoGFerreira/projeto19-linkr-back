import { Router } from "express";
import { getPost, sendPost } from "../controllers/post.controllers.js";
import validateAuth from "../middleware/validateAuth.middleware.js";
import validateSchema from "../middleware/validateSchema.middleware.js";
import { postSchema } from "../schemas/post.schema.js";

const postRouter = Router();

postRouter.post("/post", validateSchema(postSchema), validateAuth, sendPost)
postRouter.get("/post", getPost)

export default postRouter