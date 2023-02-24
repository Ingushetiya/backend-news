import express from "express"
// import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { validationResult } from "express-validator"
import bcrypt from "bcrypt"
import UserModel from "./models/User.js"
import { registerValidator } from "./validations/auth.js"

const app = express()
const PORT = 4000
app.use(express.json())
mongoose
  .connect("mongodb+srv://ingushetiya:89286953059aA@cluster0.tgpnukm.mongodb.net/Blog-News")
  .then(() => console.log("Connect DB"))
  .catch((err) => console.log("DB error", err))

app.post("/auth/register", registerValidator, async (req, res) => {
  // const { email, fullName, password, avatarUrl } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }
  const password = req.body.password
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)
  const doc = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    password: passwordHash
  })

  const user = await doc.save()
  res.json(user)
})

app.listen(PORT, (err) => {
  if (err) {
    return err
  }
  console.log("Server start");
})

// const token = jwt.sign({
//   email: req.body.email,
//   fullname: "Вася Пупкин"
// }, "secret123")

// res.json({
//   succes: true,
//   token
// })