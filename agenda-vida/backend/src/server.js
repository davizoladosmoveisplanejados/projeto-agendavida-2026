require("dotenv").config()

const express = require("express")
const cors = require("cors")

const userRoutes = require("./routes/userRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use(userRoutes)

app.get("/", (req, res) => {
  res.send("Backend AgendaVida funcionando!")
})

app.listen(3000, () => {
  console.log(`Servidor rodando em: http://localhost:3000`)
})