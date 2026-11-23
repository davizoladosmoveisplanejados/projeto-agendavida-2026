const express = require("express")
const router = express.Router()

const {
  listarHorarios,
  listarHorariosDisponiveisCtrl,
  criarHorarioCtrl,
  buscarHorarioPorIdCtrl,
  atualizarHorarioCtrl,
  deletarHorarioCtrl,
} = require("../controllers/horarioController.js")

router.get("/horarios", listarHorarios)
router.post("/horarios", criarHorarioCtrl)
router.get("/horarios/:id", buscarHorarioPorIdCtrl)
// Listar horários disponíveis de um exame específico
router.get("/exames/:id_exame/horarios/disponiveis", listarHorariosDisponiveisCtrl)
router.put("/horarios/:id", atualizarHorarioCtrl)
router.delete("/horarios/:id", deletarHorarioCtrl)

module.exports = router
