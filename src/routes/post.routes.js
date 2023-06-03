import { Router } from "express";
import { getPost, sendPost } from "../controllers/post.controllers.js";
import validateAuth from "../middleware/validateAuth.middleware.js";
import validateSchema from "../middleware/validateSchema.middleware.js";
import { postSchema } from "../schemas/post.schema.js";
import extractHashtags from "../middleware/extractHashtags.middleware.js";
import { getPostsByHashtag, getHashtagRanking } from "../controllers/hashtag.controllers.js";

const postRouter = Router();

postRouter.post("/post", validateSchema(postSchema), validateAuth, extractHashtags, sendPost);
postRouter.get("/post", getPost);
postRouter.get("/hashtags/:hashtag", getPostsByHashtag);
postRouter.get("/hashtags", getHashtagRanking);

export default postRouter;
