import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import authRouter from "./routes/auth.routes.js"
import postRouter from "./routes/post.routes.js"

const port = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use(authRouter)
app.use(postRouter)


app.listen(port, () => {
    console.log(`Server running in port ${port}.`)
})