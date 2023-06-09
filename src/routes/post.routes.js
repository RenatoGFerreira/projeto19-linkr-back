import { Router } from "express";
import { getPost, sendPost, deletePost, updatePost, getTopHashtags, getPostsByHashtag, getPostCount, curtCommentPost, getCurtComments, upLikes } from "../controllers/post.controllers.js";
import validateAuth from "../middleware/validateAuth.middleware.js";
import validateSchema from "../middleware/validateSchema.middleware.js";
import { postSchema, updateSchema, deleteSchema, commentSchema, postIdSchema, likeSchema } from "../schemas/post.schema.js";

const postRouter = Router();

postRouter.post("/post", validateSchema(postSchema), validateAuth, sendPost);
postRouter.get("/post", getPost); 
postRouter.get("/post/count",  getPostCount); 
postRouter.get("/hashtag/:hashtag", getPostsByHashtag);
postRouter.delete("/post", validateAuth, deletePost);
postRouter.put("/post", validateSchema(updateSchema), validateAuth, updatePost);
postRouter.get("/hashtag", getTopHashtags);
postRouter.post("/postId", validateSchema(commentSchema), validateAuth, curtCommentPost);
postRouter.post("/postsId", validateSchema(postIdSchema), getCurtComments); 
postRouter.put("/postId", validateSchema(likeSchema), validateAuth, upLikes);

export default postRouter;
