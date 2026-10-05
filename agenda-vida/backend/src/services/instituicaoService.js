const Instituicao = require("../models/Instituicao")

async function listarInstituicao() {
  return await Instituicao.findAll()
}

async function criarInstituicao(dados) {
  const novaInstituicao = await Instituicao.create(dados)
  return novaInstituicao
}

async function buscarInstituicaoPorId(id) {
  const instituicao = await Instituicao.findByPk(id)
  return instituicao
}

async function atualizarInstituicao(id, dados) {
  const instituicao = await Instituicao.findByPk(id)
  if (!instituicao) {
    return null
  }
  await instituicao.update(dados)
  return instituicao
}

async function deletarInstituicao(id) {
  const instituicao = await Instituicao.findByPk(id)
  if (!instituicao) {
    return null
  }
  await instituicao.destroy()
  return instituicao
}

module.exports = {
  listarInstituicao,
  criarInstituicao,
  buscarInstituicaoPorId,
  atualizarInstituicao,
  deletarInstituicao,
}
