import express from "express"
import mongoose from "mongoose"
import multer from "multer"
import cors from "cors"
import { registerValidator, loginValidator, postCreateValidator } from "./validations/validations.js"
import { UserController, PostController } from "./controllers/index.js"
import { checkAuth, handleValidationErrors } from "./utils/index.js"


const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads")
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage });

const app = express()
const PORT = 4000
app.use(express.json())
app.use("/uploads", express.static('uploads'))
app.use(cors())
mongoose
  .connect("mongodb+srv://ingushetiya:89286953059aA@cluster0.tgpnukm.mongodb.net/Blog-News")
  .then(() => console.log("Connect DB"))
  .catch((err) => console.log("DB error", err))




app.post("/auth/login", loginValidator, handleValidationErrors, UserController.login)
app.post("/auth/register", registerValidator, handleValidationErrors, UserController.register)
app.get("/auth/me", checkAuth, UserController.getMe)


app.post('/upload', checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.get("/tags", PostController.getLastTags)
app.get('/posts', PostController.getAll)
app.get("/posts/:id", PostController.getOne)
app.post("/posts", checkAuth, postCreateValidator, handleValidationErrors, PostController.createPost)
app.delete("/posts/:id", checkAuth, PostController.remove)
app.patch("/posts/:id", checkAuth, postCreateValidator, handleValidationErrors, PostController.update)


app.listen(PORT, (err) => {
  if (err) {
    return err
  }
  console.log("Server start");
})



