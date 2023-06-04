import { Router } from "express";
import { getPost, sendPost, deletePost, updatePost } from "../controllers/post.controllers.js";
import validateAuth from "../middleware/validateAuth.middleware.js";
import validateSchema from "../middleware/validateSchema.middleware.js";
import { postSchema, updateSchema } from "../schemas/post.schema.js";
// import extractHashtags from "../middleware/extractHashtag.middleware.js";
import { getPostsByHashtag, getHashtagRanking } from "../controllers/hashtag.controllers.js";

const postRouter = Router();

postRouter.post("/post", validateSchema(postSchema), validateAuth, sendPost);
postRouter.get("/post", getPost);
postRouter.delete("/post", validateAuth, deletePost);
postRouter.put("/post", validateSchema(updateSchema), validateAuth, updatePost);
postRouter.get("/hashtags/:hashtag", getPostsByHashtag);
postRouter.get("/hashtags", getHashtagRanking);

export default postRouter;
