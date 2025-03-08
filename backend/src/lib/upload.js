import multer from "multer"
import path from "path"
import fs from "fs"

const __dirname = path.resolve()

const uploadFolder = path.join(__dirname, "uploads")

//Create a folder if not exist
fs.mkdirSync(uploadFolder, { recursive: true })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random())
    cb(null, `${file.originalname}`)
  },
})

export const upload = multer({ storage: storage })

/*

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === 'audio/mp3') {
      cb(null, 'songs')
    } else if (file.mimetype === 'image/jpeg') {
      cb(null, 'img')
    } else {
      console.log(file.mimetype)
      cb({ error: 'Mime type not supported' })
    }
  }
})

*/
