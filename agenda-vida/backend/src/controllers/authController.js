const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Instituicao = require("../models/Instituicao")

// ─── Helpers ────────────────────────────────────────────────────────────────

function gerarToken(user) {
  return jwt.sign(
    { id: user.id_usuario, email: user.email, tipo: user.tipo },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  )
}

function usuarioPublico(user) {
  return {
    id: user.id_usuario,
    nome: user.nome,
    email: user.email,
    cpf: user.cpf,
    telefone: user.telefone,
    tipo: user.tipo
  }
}

// ─── Registro de Cliente ─────────────────────────────────────────────────────

async function registrarCliente(req, res) {
  try {
    const { nome, email, cpf, telefone, senha } = req.body

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: "Nome, e-mail e senha são obrigatórios." })
    }

    const emailExistente = await User.findOne({ where: { email } })
    if (emailExistente) {
      return res.status(409).json({ erro: "Já existe uma conta com este e-mail." })
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    const novoUser = await User.create({
      nome,
      email,
      cpf: cpf || null,
      telefone: telefone || null,
      senha: senhaHash,
      tipo: "cliente"
    })

    const token = gerarToken(novoUser)

    return res.status(201).json({
      mensagem: "Conta criada com sucesso!",
      token,
      usuario: usuarioPublico(novoUser)
    })
  } catch (err) {
    return res.status(500).json({ erro: err.message })
  }
}

// ─── Registro de Instituição ──────────────────────────────────────────────────

async function registrarInstituicao(req, res) {
  try {
    const { nome, email, cnpj, telefone, endereco, senha } = req.body

    if (!nome || !email || !telefone || !endereco || !senha) {
      return res.status(400).json({ erro: "Nome, e-mail, telefone, endereço e senha são obrigatórios." })
    }

    const emailExistente = await User.findOne({ where: { email } })
    if (emailExistente) {
      return res.status(409).json({ erro: "Já existe uma conta com este e-mail." })
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    // Cria o usuário com tipo 'instituicao'
    const novoUser = await User.create({
      nome,
      email,
      cpf: cnpj || null,  // campo cpf reutilizado para CNPJ da instituição
      telefone,
      senha: senhaHash,
      tipo: "instituicao"
    })

    // Cria o registro na tabela instituicao
    const novaInstituicao = await Instituicao.create({
      nome,
      endereco,
      telefone
    })

    const token = gerarToken(novoUser)

    return res.status(201).json({
      mensagem: "Instituição cadastrada com sucesso!",
      token,
      usuario: usuarioPublico(novoUser),
      instituicao: novaInstituicao
    })
  } catch (err) {
    return res.status(500).json({ erro: err.message })
  }
}

// ─── Login Unificado ─────────────────────────────────────────────────────────

async function login(req, res) {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      return res.status(400).json({ erro: "E-mail e senha são obrigatórios." })
    }

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos." })
    }

    const senhaValida = await bcrypt.compare(senha, user.senha)
    if (!senhaValida) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos." })
    }

    const token = gerarToken(user)

    return res.json({
      mensagem: "Login realizado com sucesso!",
      token,
      usuario: usuarioPublico(user)
    })
  } catch (err) {
    return res.status(500).json({ erro: err.message })
  }
}

// ─── Perfil do usuário logado ─────────────────────────────────────────────────

async function perfil(req, res) {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id_usuario", "nome", "email", "cpf", "telefone", "tipo"]
    })
    if (!user) {
      return res.status(404).json({ erro: "Usuário não encontrado." })
    }
    return res.json(usuarioPublico(user))
  } catch (err) {
    return res.status(500).json({ erro: err.message })
  }
}

module.exports = { registrarCliente, registrarInstituicao, login, perfil }
