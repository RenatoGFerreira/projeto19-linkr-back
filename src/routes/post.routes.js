import { Router } from "express";
import { getPost, sendPost, deletePost, updatePost, getTopHashtags, curtCommentPost, getCurtComments, upLikes } from "../controllers/post.controllers.js";
import validateAuth from "../middleware/validateAuth.middleware.js";
import validateSchema from "../middleware/validateSchema.middleware.js";
import { postSchema, updateSchema, deleteSchema, commentSchema, postIdSchema, likeSchema } from "../schemas/post.schema.js";


const postRouter = Router();

postRouter.post("/post", validateSchema(postSchema), validateAuth, sendPost);
postRouter.get("/post", getPost); // Rota para obter todos os posts
postRouter.get("/hashtag/:hashtag", getPost); // Rota para obter posts por hashtag
postRouter.delete("/post", validateSchema(deleteSchema), validateAuth, deletePost);
postRouter.put("/post", validateSchema(updateSchema), validateAuth, updatePost);
postRouter.get("/hashtag", getTopHashtags);
postRouter.post("/postId", validateSchema(commentSchema), validateAuth, curtCommentPost);
postRouter.post("/postsId", validateSchema(postIdSchema), getCurtComments); 
postRouter.put("/postId", validateSchema(likeSchema), validateAuth, upLikes);

export default postRouter;
