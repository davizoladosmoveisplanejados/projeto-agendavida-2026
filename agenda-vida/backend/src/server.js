require("dotenv").config()

const express = require("express")
const cors = require("cors")

const userRoutes = require("./routes/userRoutes")
const instituicaoRoutes = require("./routes/instituicaoRoutes")
const exameRoutes = require("./routes/exameRoutes")
const horarioRoutes = require("./routes/horarioRoutes")
const agendamentoRoutes = require("./routes/agendamentoRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use(userRoutes)
app.use(instituicaoRoutes)
app.use(exameRoutes)
app.use(horarioRoutes)
app.use(agendamentoRoutes)

app.get("/", (req, res) => {
  res.send("Backend AgendaVida funcionando!")
})

app.listen(3000, () => {
  console.log(`Servidor rodando em: http://localhost:3000`)
})