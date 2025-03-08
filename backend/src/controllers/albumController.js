import db from "../db/db.js"
import fs from "fs"

export const createAlbum = async (req, res) => {
  try {
    const name = req.body.name
    const desc = req.body.desc
    const bgColor = req.body.bgColor
    const imageFile = req.file

    if (!name || !desc || !bgColor || !imageFile) {
      return res.status(400).json({ message: "Data is not completed!" })
    }
    const data = await db.album.create({
      data: {
        name,
        desc,
        bgColor,
        image: imageFile.filename,
      },
    })

    res.status(200).json({ success: true, data })
    //
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create album!",
      error: error.message,
    })
  }
}

export const listAlbum = async (req, res) => {
  try {
    const data = await db.album.findMany()

    res.status(200).json({ success: true, data })
    //
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get albums!",
      error: error.message,
    })
  }
}

export const deleteAlbum = async (req, res) => {
  const { id } = await req.params

  try {
    const album = await db.album.delete({ where: { id } })
    fs.unlink(`./uploads/${album.image}`, (err) => {
      if (err) {
        console.log(err)
      }
      console.log("File image is deleted.")
    })

    res.status(200).json({ success: true, message: "Album deleted" })
    //
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete album!",
      error: error.message,
    })
  }
}
