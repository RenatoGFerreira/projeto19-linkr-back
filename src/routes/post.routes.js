import { Router } from "express";
import { getPosts, sendPost, deletePost, updatePost, getTopHashtags, getPostsByHashtag } from "../controllers/post.controllers.js";
import validateAuth from "../middleware/validateAuth.middleware.js";
import validateSchema from "../middleware/validateSchema.middleware.js";
import { postSchema, updateSchema } from "../schemas/post.schema.js";

const postRouter = Router();

postRouter.post("/post", validateSchema(postSchema), validateAuth, sendPost);
postRouter.get("/post", getPosts); // Rota para obter todos os posts
postRouter.get("/hashtag/:hashtag", getPostsByHashtag); // Rota para obter posts por hashtag
postRouter.delete("/post", validateAuth, deletePost);
postRouter.put("/post", validateSchema(updateSchema), validateAuth, updatePost);
postRouter.get("/hashtag", getTopHashtags);

export default postRouter;
