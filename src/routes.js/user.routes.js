import {Router} from "express.js"

const userRouter = Router()

userRouter.post("/sign-up")
userRouter.post("/sign-in")

export default userRouter