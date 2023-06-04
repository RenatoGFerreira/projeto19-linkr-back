import { Router } from "express";
import { insertLike, deleteLike, totalLikes } from "../controllers/like.controllers.js";
import validateAuth from "../middleware/validateAuth.middleware.js";

const likeRouter = Router();

likeRouter.post("/insertLike", insertLike)
likeRouter.delete("/removeLike", deleteLike)
likeRouter.get("/getTotalLikes", totalLikes)

export default likeRouter;