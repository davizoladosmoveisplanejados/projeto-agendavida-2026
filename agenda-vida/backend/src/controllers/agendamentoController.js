const {
  listarAgendamento,
  listarAgendamentoPorUsuario,
  criarAgendamento,
  buscarAgendamentoPorId,
  cancelarAgendamento,
  reagendarAgendamento,
} = require("../services/agendamentoService.js")

async function listarAgendamentos(req, res) {
  try {
    const agendamentos = await listarAgendamento()
    res.json(agendamentos)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

async function listarAgendamentosDoUsuario(req, res) {
  try {
    const agendamentos = await listarAgendamentoPorUsuario(req.params.id_usuario)
    res.json(agendamentos)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
}

async function criarAgendamentoCtrl(req, res) {
  try {
    const novoAgendamento = await criarAgendamento(req.body)
    res.status(201).json(novoAgendamento)
  } catch (error) {
    // Erro de horário duplicado retorna 409 Conflict
    if (error.message.includes("já está ocupado")) {
      return res.status(409).json({ erro: error.message })
    }
    res.status(500).json({ erro: error.message })
  }
}

async function buscarAgendamentoPorIdCtrl(req, res) {
  try {
    const agendamento = await buscarAgendamentoPorId(req.params.id)
    if (!agendamento) {
      return res.status(404).json({ erro: "Agendamento não encontrado" })
    }
    res.json(agendamento)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
}

async function cancelarAgendamentoCtrl(req, res) {
  try {
    const agendamento = await cancelarAgendamento(req.params.id)
    if (!agendamento) {
      return res.status(404).json({ erro: "Agendamento não encontrado" })
    }
    res.json({ mensagem: "Agendamento cancelado com sucesso!", agendamento })
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
}

async function reagendarAgendamentoCtrl(req, res) {
  try {
    const { novoId_horario } = req.body
    const agendamento = await reagendarAgendamento(req.params.id, novoId_horario)
    if (!agendamento) {
      return res.status(404).json({ erro: "Agendamento não encontrado" })
    }
    res.json({ mensagem: "Agendamento reagendado com sucesso!", agendamento })
  } catch (err) {
    if (err.message.includes("já está ocupado")) {
      return res.status(409).json({ erro: err.message })
    }
    res.status(500).json({ erro: err.message })
  }
}

module.exports = {
  listarAgendamentos,
  listarAgendamentosDoUsuario,
  criarAgendamentoCtrl,
  buscarAgendamentoPorIdCtrl,
  cancelarAgendamentoCtrl,
  reagendarAgendamentoCtrl,
}
