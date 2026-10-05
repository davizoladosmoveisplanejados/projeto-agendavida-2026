const express = require("express")
const router = express.Router()

const {
  listarExames,
  criarExameCtrl,
  buscarExamePorIdCtrl,
  buscarExamePorInstituicaoCtrl,
  atualizarExameCtrl,
  deletarExameCtrl,
} = require("../controllers/exameController.js")

router.get("/exames", listarExames)
router.post("/exames", criarExameCtrl)
router.get("/exames/:id", buscarExamePorIdCtrl)
// Buscar exames de uma instituição específica
router.get("/instituicoes/:id_instituicao/exames", buscarExamePorInstituicaoCtrl)
router.put("/exames/:id", atualizarExameCtrl)
router.delete("/exames/:id", deletarExameCtrl)

module.exports = router
