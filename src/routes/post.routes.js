import { Router } from "express";
import { getPost, sendPost, deletePost, updatePost, getTopHashtags, getPostsByHashtag, getPostCount } from "../controllers/post.controllers.js";
import validateAuth from "../middleware/validateAuth.middleware.js";
import validateSchema from "../middleware/validateSchema.middleware.js";
import { postSchema, updateSchema } from "../schemas/post.schema.js";

const postRouter = Router();

postRouter.post("/post", validateSchema(postSchema), validateAuth, sendPost);
postRouter.get("/post", getPost); 
postRouter.get("/post/count",  getPostCount); 
postRouter.get("/hashtag/:hashtag", getPostsByHashtag);
postRouter.delete("/post", validateAuth, deletePost);
postRouter.put("/post", validateSchema(updateSchema), validateAuth, updatePost);
postRouter.get("/hashtag", getTopHashtags);

export default postRouter;
