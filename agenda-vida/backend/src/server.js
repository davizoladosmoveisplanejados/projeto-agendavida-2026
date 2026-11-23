require("dotenv").config()

const express = require("express")
const cors = require("cors")
const sequelize = require("./config/database")

// Rotas
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const instituicaoRoutes = require("./routes/instituicaoRoutes")
const exameRoutes = require("./routes/exameRoutes")
const horarioRoutes = require("./routes/horarioRoutes")
const agendamentoRoutes = require("./routes/agendamentoRoutes")

// Middlewares de autenticação aplicados nas rotas que precisam
const { autenticar, apenasInstituicao } = require("./middlewares/authMiddleware")

const app = express()

// ─── CORS ───────────────────────────────────────────────────────────────────
const origensPermitidas = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map(o => o.trim())
  : ["http://localhost:5173"]

app.use(cors({
  origin: origensPermitidas,
  credentials: true
}))

app.use(express.json())

// ─── Prefixo /api ────────────────────────────────────────────────────────────
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", instituicaoRoutes)
app.use("/api", exameRoutes)
app.use("/api", horarioRoutes)
app.use("/api", agendamentoRoutes)

// ─── Health check ────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "ok", mensagem: "Backend AgendaVida funcionando!" })
})

// ─── Inicialização ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Conexão com o banco de dados estabelecida.")
    // alter:true atualiza as tabelas sem apagar dados existentes
    return sequelize.sync({ alter: true })
  })
  .then(() => {
    console.log("✅ Modelos sincronizados com o banco.")
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error("❌ Erro ao conectar ao banco:", err.message)
    process.exit(1)
  })
