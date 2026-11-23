const express = require("express")
const router = express.Router()
const { autenticar } = require("../middlewares/authMiddleware")
const {
  registrarCliente,
  registrarInstituicao,
  login,
  perfil
} = require("../controllers/authController")

// Registro de cliente (paciente)
router.post("/auth/register", registrarCliente)

// Registro de instituição (clínica / laboratório)
router.post("/auth/register/instituicao", registrarInstituicao)

// Login unificado — retorna JWT + tipo do usuário
router.post("/auth/login", login)

// Rota protegida: retorna dados do usuário logado
router.get("/auth/me", autenticar, perfil)

module.exports = router
