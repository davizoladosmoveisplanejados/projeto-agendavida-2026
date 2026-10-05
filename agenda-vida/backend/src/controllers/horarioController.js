const {
  listarHorario,
  listarHorariosDisponiveis,
  criarHorario,
  buscarHorarioPorId,
  atualizarHorario,
  deletarHorario,
} = require("../services/horarioService.js")

async function listarHorarios(req, res) {
  try {
    const horarios = await listarHorario()
    res.json(horarios)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

async function listarHorariosDisponiveisCtrl(req, res) {
  try {
    const horarios = await listarHorariosDisponiveis(req.params.id_exame)
    res.json(horarios)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
}

async function criarHorarioCtrl(req, res) {
  try {
    const novoHorario = await criarHorario(req.body)
    res.status(201).json(novoHorario)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

async function buscarHorarioPorIdCtrl(req, res) {
  try {
    const horario = await buscarHorarioPorId(req.params.id)
    if (!horario) {
      return res.status(404).json({ erro: "Horário não encontrado" })
    }
    res.json(horario)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
}

async function atualizarHorarioCtrl(req, res) {
  try {
    const horario = await atualizarHorario(req.params.id, req.body)
    if (!horario) {
      return res.status(404).json({ erro: "Horário não encontrado" })
    }
    res.json(horario)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
}

async function deletarHorarioCtrl(req, res) {
  try {
    const horario = await deletarHorario(req.params.id)
    if (!horario) {
      return res.status(404).json({ erro: "Horário não encontrado" })
    }
    res.json({ mensagem: "Horário deletado com sucesso!" })
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
}

module.exports = {
  listarHorarios,
  listarHorariosDisponiveisCtrl,
  criarHorarioCtrl,
  buscarHorarioPorIdCtrl,
  atualizarHorarioCtrl,
  deletarHorarioCtrl,
}
