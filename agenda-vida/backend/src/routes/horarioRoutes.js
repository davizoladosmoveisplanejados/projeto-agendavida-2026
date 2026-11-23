const express = require("express")
const router = express.Router()
const { autenticar, apenasInstituicao } = require("../middlewares/authMiddleware")

const {
  listarHorarios,
  listarHorariosDisponiveisCtrl,
  criarHorarioCtrl,
  buscarHorarioPorIdCtrl,
  atualizarHorarioCtrl,
  deletarHorarioCtrl,
} = require("../controllers/horarioController.js")

// Consultas públicas de horário
router.get("/horarios", listarHorarios)
router.get("/horarios/:id", buscarHorarioPorIdCtrl)
router.get("/exames/:id_exame/horarios/disponiveis", listarHorariosDisponiveisCtrl)

// Criar/editar/deletar horários: apenas instituição
router.post("/horarios", autenticar, apenasInstituicao, criarHorarioCtrl)
router.put("/horarios/:id", autenticar, apenasInstituicao, atualizarHorarioCtrl)
router.delete("/horarios/:id", autenticar, apenasInstituicao, deletarHorarioCtrl)

module.exports = router
