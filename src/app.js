import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js"
import likeRouter from "./routes/like.routes.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(postRouter);
app.use(likeRouter)



app.listen(port, () => {
    console.log(`Server running in port ${port}.`)
});