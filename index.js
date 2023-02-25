import express from "express"
import mongoose, { get } from "mongoose"

import checkAuth from './utils/checkAuth.js'
import { registerValidator } from "./validations/validations.js"

import { register, getMe, login } from "./controller/UserController.js"

const app = express()
const PORT = 4000
app.use(express.json())
mongoose
  .connect("mongodb+srv://ingushetiya:89286953059aA@cluster0.tgpnukm.mongodb.net/Blog-News")
  .then(() => console.log("Connect DB"))
  .catch((err) => console.log("DB error", err))

app.post("/auth/login", login)
app.post("/auth/register", registerValidator, register)

app.get("/auth/me", checkAuth, getMe)

app.listen(PORT, (err) => {
  if (err) {
    return err
  }
  console.log("Server start");
})



