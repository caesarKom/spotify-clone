import express from "express"
import {
  createSong,
  deleteSong,
  getAllSong,
  getSongbyUserId,
  fetchSongsbyTitle,
  checkLikedSong,
  makeLikedSong,
  deleteLikedSong,
  getLikedSongs,
  getSongbyId,
} from "../controllers/songController.js"
import { upload } from "../lib/upload.js"

const songRouter = express.Router()

songRouter.get("/list", getAllSong)
songRouter.get("/search/:title", fetchSongsbyTitle)
songRouter.get("/:id", getSongbyUserId)
songRouter.get("/songs/:id", getSongbyId)
songRouter.delete("/delete/:id", deleteSong)
songRouter.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "song", maxCount: 1 },
  ]),
  createSong
)

songRouter.get("/list-liked/:userId", getLikedSongs)
songRouter.post("/liked", checkLikedSong)
songRouter.post("/newLiked", makeLikedSong)
songRouter.delete("/deleteLike", deleteLikedSong)

export default songRouter
