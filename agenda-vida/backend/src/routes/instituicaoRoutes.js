const express = require("express")
const router = express.Router()

const {
  listarInstituicoes,
  criarInstituicaoCtrl,
  buscarInstituicaoPorIdCtrl,
  atualizarInstituicaoCtrl,
  deletarInstituicaoCtrl,
} = require("../controllers/instituicaoController.js")

router.get("/instituicoes", listarInstituicoes)
router.post("/instituicoes", criarInstituicaoCtrl)
router.get("/instituicoes/:id", buscarInstituicaoPorIdCtrl)
router.put("/instituicoes/:id", atualizarInstituicaoCtrl)
router.delete("/instituicoes/:id", deletarInstituicaoCtrl)

module.exports = router
