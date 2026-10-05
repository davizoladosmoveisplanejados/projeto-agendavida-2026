const {
  listarExame,
  criarExame,
  buscarExamePorId,
  buscarExamePorInstituicao,
  atualizarExame,
  deletarExame,
} = require("../services/exameService.js")

async function listarExames(req, res) {
  try {
    const exames = await listarExame()
    res.json(exames)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

async function criarExameCtrl(req, res) {
  try {
    const novoExame = await criarExame(req.body)
    res.status(201).json(novoExame)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

async function buscarExamePorIdCtrl(req, res) {
  try {
    const exame = await buscarExamePorId(req.params.id)
    if (!exame) {
      return res.status(404).json({ erro: "Exame não encontrado" })
    }
    res.json(exame)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
}

async function buscarExamePorInstituicaoCtrl(req, res) {
  try {
    const exames = await buscarExamePorInstituicao(req.params.id_instituicao)
    res.json(exames)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
}

async function atualizarExameCtrl(req, res) {
  try {
    const exame = await atualizarExame(req.params.id, req.body)
    if (!exame) {
      return res.status(404).json({ erro: "Exame não encontrado" })
    }
    res.json(exame)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
}

async function deletarExameCtrl(req, res) {
  try {
    const exame = await deletarExame(req.params.id)
    if (!exame) {
      return res.status(404).json({ erro: "Exame não encontrado" })
    }
    res.json({ mensagem: "Exame deletado com sucesso!" })
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
}

module.exports = {
  listarExames,
  criarExameCtrl,
  buscarExamePorIdCtrl,
  buscarExamePorInstituicaoCtrl,
  atualizarExameCtrl,
  deletarExameCtrl,
}
