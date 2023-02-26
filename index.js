import express from "express"
import mongoose from "mongoose"

import checkAuth from './utils/checkAuth.js'

import { registerValidator, loginValidator, postCreateValidator } from "./validations/validations.js"

import * as UserController from "./controller/UserController.js"
import * as PostController from "./controller//PostController.js"


const app = express()
const PORT = 4000
app.use(express.json())

mongoose
  .connect("mongodb+srv://ingushetiya:89286953059aA@cluster0.tgpnukm.mongodb.net/Blog-News")
  .then(() => console.log("Connect DB"))
  .catch((err) => console.log("DB error", err))




app.post("/auth/login", loginValidator, UserController.login)
app.post("/auth/register", registerValidator, UserController.register)
app.get("/auth/me", checkAuth, UserController.getMe)


app.get('/posts', PostController.getAll)
app.get("/posts/:id", PostController.getOne)
app.post("/posts", checkAuth, postCreateValidator, PostController.createPost)
app.delete("/posts/:id", checkAuth, PostController.remove)
app.patch("/posts/:id", checkAuth, PostController.update)


app.listen(PORT, (err) => {
  if (err) {
    return err
  }
  console.log("Server start");
})



