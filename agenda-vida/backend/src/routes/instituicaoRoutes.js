const express = require("express")
const router = express.Router()
const { autenticar, apenasInstituicao } = require("../middlewares/authMiddleware")

const {
  listarInstituicoes,
  criarInstituicaoCtrl,
  buscarInstituicaoPorIdCtrl,
  atualizarInstituicaoCtrl,
  deletarInstituicaoCtrl,
} = require("../controllers/instituicaoController.js")

// Listar e buscar: público
router.get("/instituicoes", listarInstituicoes)
router.get("/instituicoes/:id", buscarInstituicaoPorIdCtrl)

// Criar/editar/deletar: apenas instituição autenticada
router.post("/instituicoes", autenticar, apenasInstituicao, criarInstituicaoCtrl)
router.put("/instituicoes/:id", autenticar, apenasInstituicao, atualizarInstituicaoCtrl)
router.delete("/instituicoes/:id", autenticar, apenasInstituicao, deletarInstituicaoCtrl)

module.exports = router
