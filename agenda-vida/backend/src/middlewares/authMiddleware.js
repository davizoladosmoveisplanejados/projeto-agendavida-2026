const jwt = require("jsonwebtoken")

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token de autenticação não fornecido." })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // { id, email, tipo }
    next()
  } catch (err) {
    return res.status(401).json({ erro: "Token inválido ou expirado." })
  }
}

function apenasInstituicao(req, res, next) {
  if (req.user && req.user.tipo === "instituicao") {
    return next()
  }
  return res.status(403).json({ erro: "Acesso restrito a instituições." })
}

function apenasCliente(req, res, next) {
  if (req.user && req.user.tipo === "cliente") {
    return next()
  }
  return res.status(403).json({ erro: "Acesso restrito a clientes." })
}

module.exports = { autenticar, apenasInstituicao, apenasCliente }
