import db from "../db/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function register(req, res) {
  try {
    const { name, email, password } = await req.body.data
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Invalid data" })
    }
    const userExist = await db.user.findUnique({ where: { email } })
    if (userExist) {
      return res.status(409).json({ message: "User Alredy exist" })
    }
    const hashPassword = await bcrypt.hash(password, 12)

    await db.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    })

    return res
      .status(201)
      .json({ success: true, message: "User created Successfully!" })
    //
  } catch (error) {
    return res.status(500).json({ success: false, error })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = await req.body.data

    const userdb = await db.user.findUnique({ where: { email } })
    if (!userdb) {
      return res.status(404).json({ message: "Not Found data" })
    }
    const matchPassword = bcrypt.compare(password, userdb.password)
    if (!matchPassword)
      return res.status(409).json({ message: "Password does not Match." })

    const token = signToken(userdb.id)

    //remove user password from output
    userdb.password = undefined

    res.cookie("asa", token, {
      expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
      httpOnly: true,
      secure: false, // req.secure || req.headers["x-forwarded-proto"] === "https",
      sameSite: "lax", // lax Prevent CSRF attacks
      path: "/",
      //domain: "localhost",
    })

    res.status(200).json({ success: true, user: userdb, accessToken: token })

    //
  } catch (error) {
    return res.status(500).json({ success: false, error })
  }
}

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

//check if user is logged in
export async function checkLoggedUser(req, res) {
  let currentUser
  if (req.cookies.asa) {
    const token = req.cookies.asa
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    currentUser = await db.user.findUnique({ where: { id: decoded.id } })
  } else {
    currentUser = null
  }

  res.status(200).json(currentUser)
}

//log out
export async function logout(req, res) {
  res.cookie("asa", "loggedout", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  })
  res.status(200).json({ message: "User is logged out" })
}
