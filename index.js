import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const app = express()
const PORT = 4000
app.use(express.json())
mongoose
  .connect("mongodb+srv://ingushetiya:89286953059aA@cluster0.tgpnukm.mongodb.net/test")
  .then(() => console.log("Connect DB"))
  .catch((err) => console.log("DB error", err))

app.post("/auth/login", (req, res) => {
  const token = jwt.sign({
    email: req.body.email,
    fullname: "Вася Пупкин"
  }, "secret123")

  res.json({
    succes: true,
    token
  })
})

app.listen(PORT, (err) => {
  if (err) {
    return err
  }
  console.log("Server start");
})