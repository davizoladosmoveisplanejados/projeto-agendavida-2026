const express = require("express")
const router = express.Router()
const { autenticar, apenasInstituicao } = require("../middlewares/authMiddleware")

const {
  listarAgendamentos,
  listarAgendamentosDoUsuario,
  criarAgendamentoCtrl,
  buscarAgendamentoPorIdCtrl,
  cancelarAgendamentoCtrl,
  reagendarAgendamentoCtrl,
} = require("../controllers/agendamentoController.js")

// Apenas instituição vê todos os agendamentos
router.get("/agendamentos", autenticar, apenasInstituicao, listarAgendamentos)

// Criar agendamento (apenas clientes autenticados)
router.post("/agendamentos", autenticar, criarAgendamentoCtrl)

// Buscar agendamento por id
router.get("/agendamentos/:id", autenticar, buscarAgendamentoPorIdCtrl)

// Histórico de agendamentos do próprio usuário autenticado
router.get("/meus-agendamentos", autenticar, (req, res, next) => {
  req.params.id_usuario = req.user.id
  next()
}, listarAgendamentosDoUsuario)

// Histórico de agendamentos por usuário (admin/instituição)
router.get("/usuarios/:id_usuario/agendamentos", autenticar, apenasInstituicao, listarAgendamentosDoUsuario)

// Cancelar agendamento
router.patch("/agendamentos/:id/cancelar", autenticar, cancelarAgendamentoCtrl)

// Reagendar
router.patch("/agendamentos/:id/reagendar", autenticar, reagendarAgendamentoCtrl)

module.exports = router
