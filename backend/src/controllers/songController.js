import db from "../db/db.js"
import fs from "fs"

export const createSong = async (req, res) => {
  try {
    const title = req.body.title
    const userId = req.body.userId
    const author = req.body.author
    const audioFile = req.files.song[0]
    const imageFile = req.files.image[0]

    if (!title || !author || !audioFile || !imageFile) {
      return res.status(400).json({ message: "Data is not completed!" })
    }

    const data = await db.song.create({
      data: {
        title,
        author,
        image_path: imageFile.filename,
        song_path: audioFile.filename,
        userId,
      },
    })

    res.status(200).json({ success: true, data })
    //
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create song!",
      error: error.message,
    })
  }
}

export const getAllSong = async (req, res) => {
  try {
    const data = await db.song.findMany({
      orderBy: { createdAt: "desc" },
    })

    res.status(200).json({ success: true, data })
    //
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get all songs!",
      error: error.message,
    })
  }
}

export const deleteSong = async (req, res) => {
  const { id } = await req.params

  try {
    const song = await db.songModel.delete({ where: { id } })
    fs.unlink(`./uploads/${song.image}`, (err) => {
      if (err) {
        console.log(err)
      }
      console.log("File image is deleted.")
    })

    fs.unlink(`./uploads/${song.file}`, (err) => {
      if (err) {
        console.log(err)
      }
      console.log("File song is deleted.")
    })

    res.status(200).json({ success: true, message: "Song deleted" })
    //
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete song!",
      error: error.message,
    })
  }
}

export const getSongbyUserId = async (req, res) => {
  try {
    const { id } = await req.params
    const responseData = await db.song.findMany({
      where: { userId: id },
      select: {
        id: true,
        title: true,
        author: true,
        image_path: true,
        song_path: true,
      },

      orderBy: { createdAt: "desc" },
    })

    res.status(200).json({ success: true, data: responseData })
    //
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get all songs!",
      error: error.message,
    })
  }
}

export const getSongbyId = async (req, res) => {
  try {
    const { id } = await req.params
    const response = await db.song.findMany({
      where: { id: id },
    })

    res.status(200).json({ success: true, data: response })
    //
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get all songs!",
      error: error.message,
    })
  }
}

export const fetchSongsbyTitle = async (req, res) => {
  try {
    const { title } = await req.params
    console.log("Search title ----> ", title)
    const responseData = await db.song.findMany({
      where: {
        title: {
          search: title,
        },
      },
      select: {
        id: true,
        title: true,
        author: true,
        image_path: true,
        song_path: true,
      },
      orderBy: { createdAt: "desc" },
    })

    res.status(200).json({ success: true, data: responseData })
    //
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get all songs!",
      error: error.message,
    })
  }
}

export const checkLikedSong = async (req, res) => {
  try {
    const { userId, songId } = await req.body

    if (!userId || !songId) {
      return res.status(400).json({ message: "Invalid data" })
    }

    const result = await db.likedSong.findFirst({
      where: {
        userId: userId,
        songId: songId,
      },
    })

    res.status(200).json({ success: true, data: result })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to check liked songs",
      error: error.message,
    })
  }
}

export const makeLikedSong = async (req, res) => {
  try {
    const { userId, songId } = await req.body

    if (!userId || !songId) {
      return res.status(400).json({ message: "Invalid data" })
    }

    const result = await db.likedSong.create({
      data: {
        userId,
        songId,
      },
    })

    res.status(200).json({ success: true, data: result })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create liked song",
      error: error.message,
    })
  }
}

export const deleteLikedSong = async (req, res) => {
  try {
    const { userId, songId } = req.query

    if (!userId || !songId) {
      return res.status(400).json({ message: "Invalid data" })
    }

    const { id } = await db.likedSong.findFirst({
      where: { songId: songId },
    })

    const result = await db.likedSong.delete({
      where: {
        id,
      },
    })

    res.status(200).json({ success: true, data: result })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete liked song",
      error: error.message,
    })
  }
}

export const getLikedSongs = async (req, res) => {
  try {
    const { userId } = await req.params

    if (!userId) {
      return res.status(400).json({ message: "Invalid data" })
    }

    const result = await db.likedSong.findMany({
      where: {
        userId: userId,
      },
      select: {
        songId: true,
        songs: true,
      },
    })

    res.status(200).json({ success: true, data: result })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to find liked song",
      error: error.message,
    })
  }
}
