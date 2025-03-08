import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import songRouter from "./routers/songRoute.js"
import albumRouter from "./routers/albumRouter.js"
import userRouter from "./routers/userRouter.js"

const app = express()
const port = process.env.PORT || 5005

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true }))
app.use(express.urlencoded({ extended: true }))
// Serve images http://localhost:3000/api/image/1724001944893-_d929b68d.jpg
app.use("/api/storage", express.static("uploads"))
//

app.use("/api/song", songRouter)
app.use("/api/album", albumRouter)
app.use("/api/user", userRouter)

app.listen(port, () => console.log(`Server start on http://localhost:${port}`))
