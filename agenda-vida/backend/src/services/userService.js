const User = require("../models/User");

async function listarUser() {
  return await User.findAll();
}

async function criarUser(dados) {
  const novoUsuario = await User.create(dados);
  return novoUsuario;
}

async function buscarUserPorId(id) {
  const usuario = await User.findByPk(id);
  return usuario;
}

async function atualizarUser(id, dados) {
  const usuario = await User.findByPk(id);
  if (!usuario) {
    return null;
  }
  await usuario.update(dados);
  return usuario;
}

async function deletarUser(id) {
  const usuario = await User.findByPk(id);
  if(!usuario){
    return null;
  }
  await usuario.destroy();
  return usuario;
}

module.exports = {
  listarUser,
  criarUser,
  buscarUserPorId,
  atualizarUser,
  deletarUser,
};
