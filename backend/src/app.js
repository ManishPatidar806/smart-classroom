import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({ extended: true, limit: "16kb"}))
// app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.route.js"
import healthRouter from "./routes/health.route.js"
import quizRouter from "./routes/quiz.route.js"
import classRoomRouter from "./routes/classroom.route.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/health", healthRouter)
app.use("/api/v1/quiz", quizRouter)
app.use("/api/v1/classroom", classRoomRouter)

export {app}