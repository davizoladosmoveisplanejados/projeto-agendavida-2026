const express = require("express")
const router = express.Router()
const { autenticar, apenasInstituicao } = require("../middlewares/authMiddleware")

const {
  listarExames,
  criarExameCtrl,
  buscarExamePorIdCtrl,
  buscarExamePorInstituicaoCtrl,
  atualizarExameCtrl,
  deletarExameCtrl,
} = require("../controllers/exameController.js")

// Listar exames é público (cliente precisa ver sem login ainda)
router.get("/exames", listarExames)
router.get("/exames/:id", buscarExamePorIdCtrl)
router.get("/instituicoes/:id_instituicao/exames", buscarExamePorInstituicaoCtrl)

// Criar/editar/deletar exames: apenas instituição autenticada
router.post("/exames", autenticar, apenasInstituicao, criarExameCtrl)
router.put("/exames/:id", autenticar, apenasInstituicao, atualizarExameCtrl)
router.delete("/exames/:id", autenticar, apenasInstituicao, deletarExameCtrl)

module.exports = router
