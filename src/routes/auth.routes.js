import {Router} from "express"
import { signUp } from "../controllers/auth.controllers.js"
import validateSchema from "../middleware/validateSchema.middleware.js"
import { userSchema } from "../schemas/auth.schema.js"

const authRouter = Router()

authRouter.post("/sign-up", validateSchema(userSchema), signUp)
authRouter.post("/sign-in")

export default authRouter