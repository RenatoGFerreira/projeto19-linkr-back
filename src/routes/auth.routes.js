import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controllers.js";
import validateSchema from "../middleware/validateSchema.middleware.js";
import { userSchema, loginSchema } from "../schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(userSchema), signUp);
authRouter.post("/sign-in", validateSchema(loginSchema), signIn);

export default authRouter;