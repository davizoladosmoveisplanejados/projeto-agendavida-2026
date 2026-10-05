const {
  listarInstituicao,
  criarInstituicao,
  buscarInstituicaoPorId,
  atualizarInstituicao,
  deletarInstituicao,
} = require("../services/instituicaoService.js")

async function listarInstituicoes(req, res) {
  try {
    const instituicoes = await listarInstituicao()
    res.json(instituicoes)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

async function criarInstituicaoCtrl(req, res) {
  try {
    const novaInstituicao = await criarInstituicao(req.body)
    res.status(201).json(novaInstituicao)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

async function buscarInstituicaoPorIdCtrl(req, res) {
  try {
    const instituicao = await buscarInstituicaoPorId(req.params.id)
    if (!instituicao) {
      return res.status(404).json({ erro: "Instituição não encontrada" })
    }
    res.json(instituicao)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
}

async function atualizarInstituicaoCtrl(req, res) {
  try {
    const instituicao = await atualizarInstituicao(req.params.id, req.body)
    if (!instituicao) {
      return res.status(404).json({ erro: "Instituição não encontrada" })
    }
    res.json(instituicao)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
}

async function deletarInstituicaoCtrl(req, res) {
  try {
    const instituicao = await deletarInstituicao(req.params.id)
    if (!instituicao) {
      return res.status(404).json({ erro: "Instituição não encontrada" })
    }
    res.json({ mensagem: "Instituição deletada com sucesso!" })
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
}

module.exports = {
  listarInstituicoes,
  criarInstituicaoCtrl,
  buscarInstituicaoPorIdCtrl,
  atualizarInstituicaoCtrl,
  deletarInstituicaoCtrl,
}
