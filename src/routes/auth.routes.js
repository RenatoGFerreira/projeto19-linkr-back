import {Router} from "express"
import { signUp, signIn, signOut } from "../controllers/auth.controllers.js"
import validateSchema from "../middleware/validateSchema.middleware.js"
import { userSchema, loginSchema } from "../schemas/auth.schema.js"
import validateAuth from "../middleware/validateAuth.middleware.js";


const authRouter = Router()

authRouter.post("/sign-up", validateSchema(userSchema), signUp)
authRouter.post("/sign-in", validateSchema(loginSchema), signIn)
authRouter.post("/sign-out", validateAuth, signOut)


export default authRouter