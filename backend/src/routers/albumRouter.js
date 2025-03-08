import express from "express"
import {
  createAlbum,
  deleteAlbum,
  listAlbum,
} from "../controllers/albumController.js"
import { upload } from "../lib/upload.js"

const albumRouter = express.Router()

albumRouter.post("/add", upload.single("image"), createAlbum)
albumRouter.get("/list", listAlbum)
albumRouter.delete("/delete/:id", deleteAlbum)

export default albumRouter
