import express from "express"
import { upload } from "../lib/upload.js"
import {
  login,
  register,
  logout,
  checkLoggedUser,
} from "../controllers/authController.js"

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.post("/logout", logout)
userRouter.post("/checkLoginUser", checkLoggedUser)

export default userRouter
