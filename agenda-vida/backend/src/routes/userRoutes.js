const express = require("express")
const router = express.Router()
const { autenticar, apenasInstituicao } = require("../middlewares/authMiddleware")

const {
  listarUsuario,
  criarUsuario,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario,
} = require("../controllers/userController.js")

// Listar todos: apenas instituição
router.get("/usuarios", autenticar, apenasInstituicao, listarUsuario)

// Criar usuário direto: apenas instituição (registro público vai pelo /auth/register)
router.post("/usuarios", autenticar, apenasInstituicao, criarUsuario)

// Buscar/atualizar/deletar: apenas autenticado
router.get("/usuarios/:id", autenticar, buscarUsuarioPorId)
router.put("/usuarios/:id", autenticar, atualizarUsuario)
router.delete("/usuarios/:id", autenticar, apenasInstituicao, deletarUsuario)

module.exports = router
