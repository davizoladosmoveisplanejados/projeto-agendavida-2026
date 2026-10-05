const Agendamento = require("../models/Agendamento")
const Horario = require("../models/Horario")
const Exame = require("../models/Exame")
const User = require("../models/User")

async function listarAgendamento() {
  return await Agendamento.findAll({
    include: [
      { model: User, attributes: ["nome", "email", "cpf"] },
      {
        model: Horario,
        include: [{ model: Exame, attributes: ["nome_exame"] }]
      }
    ]
  })
}

async function listarAgendamentoPorUsuario(id_usuario) {
  return await Agendamento.findAll({
    where: { id_usuario },
    include: [
      {
        model: Horario,
        include: [{ model: Exame, attributes: ["nome_exame", "descricao"] }]
      }
    ]
  })
}

async function criarAgendamento(dados) {
  // Prevenção de horário duplicado: verifica se já existe agendamento ativo para esse horário
  const horarioOcupado = await Agendamento.findOne({
    where: { id_horario: dados.id_horario, status: true }
  })

  if (horarioOcupado) {
    throw new Error("Este horário já está ocupado. Escolha outro horário.")
  }

  // Cria o agendamento
  const novoAgendamento = await Agendamento.create({
    ...dados,
    data_agendamento: new Date(),
    status: true
  })

  // Marca o horário como indisponível
  await Horario.update(
    { disponibilidade: false },
    { where: { id_horario: dados.id_horario } }
  )

  return novoAgendamento
}

async function buscarAgendamentoPorId(id) {
  const agendamento = await Agendamento.findByPk(id, {
    include: [
      { model: User, attributes: ["nome", "email"] },
      {
        model: Horario,
        include: [{ model: Exame, attributes: ["nome_exame"] }]
      }
    ]
  })
  return agendamento
}

async function cancelarAgendamento(id) {
  const agendamento = await Agendamento.findByPk(id)
  if (!agendamento) {
    return null
  }

  // Marca o agendamento como cancelado
  await agendamento.update({ status: false })

  // Libera o horário novamente
  await Horario.update(
    { disponibilidade: true },
    { where: { id_horario: agendamento.id_horario } }
  )

  return agendamento
}

async function reagendarAgendamento(id, novoId_horario) {
  const agendamento = await Agendamento.findByPk(id)
  if (!agendamento) {
    return null
  }

  // Verifica se o novo horário está disponível
  const horarioOcupado = await Agendamento.findOne({
    where: { id_horario: novoId_horario, status: true }
  })

  if (horarioOcupado) {
    throw new Error("O novo horário escolhido já está ocupado. Escolha outro.")
  }

  // Libera o horário antigo
  await Horario.update(
    { disponibilidade: true },
    { where: { id_horario: agendamento.id_horario } }
  )

  // Atualiza para o novo horário
  await agendamento.update({
    id_horario: novoId_horario,
    data_agendamento: new Date(),
    status: true
  })

  // Marca o novo horário como indisponível
  await Horario.update(
    { disponibilidade: false },
    { where: { id_horario: novoId_horario } }
  )

  return agendamento
}

module.exports = {
  listarAgendamento,
  listarAgendamentoPorUsuario,
  criarAgendamento,
  buscarAgendamentoPorId,
  cancelarAgendamento,
  reagendarAgendamento,
}
