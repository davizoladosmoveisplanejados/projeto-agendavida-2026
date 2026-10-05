const express = require("express")
const router = express.Router()

const {
  listarAgendamentos,
  listarAgendamentosDoUsuario,
  criarAgendamentoCtrl,
  buscarAgendamentoPorIdCtrl,
  cancelarAgendamentoCtrl,
  reagendarAgendamentoCtrl,
} = require("../controllers/agendamentoController.js")

router.get("/agendamentos", listarAgendamentos)
router.post("/agendamentos", criarAgendamentoCtrl)
router.get("/agendamentos/:id", buscarAgendamentoPorIdCtrl)
// Histórico de agendamentos de um usuário específico
router.get("/usuarios/:id_usuario/agendamentos", listarAgendamentosDoUsuario)
// Cancelar agendamento
router.patch("/agendamentos/:id/cancelar", cancelarAgendamentoCtrl)
// Reagendar (enviar novoId_horario no body)
router.patch("/agendamentos/:id/reagendar", reagendarAgendamentoCtrl)

module.exports = router
