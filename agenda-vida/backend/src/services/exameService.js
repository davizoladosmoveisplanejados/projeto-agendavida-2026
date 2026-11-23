const Exame = require("../models/Exame")
const Instituicao = require("../models/Instituicao")

async function listarExame() {
  return await Exame.findAll({
    include: [{ model: Instituicao, attributes: ["nome", "endereco"] }]
  })
}

async function criarExame(dados) {
  const novoExame = await Exame.create(dados)
  return novoExame
}

async function buscarExamePorId(id) {
  const exame = await Exame.findByPk(id, {
    include: [{ model: Instituicao, attributes: ["nome", "endereco"] }]
  })
  return exame
}

async function buscarExamePorInstituicao(id_instituicao) {
  return await Exame.findAll({
    where: { id_instituicao },
    include: [{ model: Instituicao, attributes: ["nome", "endereco"] }]
  })
}

async function atualizarExame(id, dados) {
  const exame = await Exame.findByPk(id)
  if (!exame) {
    return null
  }
  await exame.update(dados)
  return exame
}

async function deletarExame(id) {
  const exame = await Exame.findByPk(id)
  if (!exame) {
    return null
  }
  await exame.destroy()
  return exame
}

module.exports = {
  listarExame,
  criarExame,
  buscarExamePorId,
  buscarExamePorInstituicao,
  atualizarExame,
  deletarExame,
}
