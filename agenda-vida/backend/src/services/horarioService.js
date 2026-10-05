const Horario = require("../models/Horario")
const Exame = require("../models/Exame")

async function listarHorario() {
  return await Horario.findAll({
    include: [{ model: Exame, attributes: ["nome_exame", "descricao"] }]
  })
}

async function listarHorariosDisponiveis(id_exame) {
  return await Horario.findAll({
    where: { id_exame, disponibilidade: true },
    include: [{ model: Exame, attributes: ["nome_exame", "descricao"] }]
  })
}

async function criarHorario(dados) {
  const novoHorario = await Horario.create(dados)
  return novoHorario
}

async function buscarHorarioPorId(id) {
  const horario = await Horario.findByPk(id, {
    include: [{ model: Exame, attributes: ["nome_exame", "descricao"] }]
  })
  return horario
}

async function atualizarHorario(id, dados) {
  const horario = await Horario.findByPk(id)
  if (!horario) {
    return null
  }
  await horario.update(dados)
  return horario
}

async function deletarHorario(id) {
  const horario = await Horario.findByPk(id)
  if (!horario) {
    return null
  }
  await horario.destroy()
  return horario
}

module.exports = {
  listarHorario,
  listarHorariosDisponiveis,
  criarHorario,
  buscarHorarioPorId,
  atualizarHorario,
  deletarHorario,
}
