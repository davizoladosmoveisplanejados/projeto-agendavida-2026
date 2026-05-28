const {
  listarUser,
  criarUser,
  buscarUserPorId,
  atualizarUser,
  deletarUser,
} = require("../services/userService.js");

async function listarUsuario(req, res) {
  try {
    const usuarios = await listarUser();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
}

async function criarUsuario(req, res) {
  try {
    const novoUsuario = await criarUser(req.body);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
}

async function buscarUsuarioPorId(req, res) {
  try {
    const usuario = await buscarUserPorId(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
    }

    res.json(usuario);
  } catch (err) {
    res.status(500).json({
      erro: err.message,
    });
  }
}

async function atualizarUsuario(req, res) {
  try {
    const usuario = await atualizarUser(req.params.id, req.body);
    if(!usuario){
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
    };
    res.json(usuario);
  } catch (err) {
    res.status(500).json({
      erro: err.message,
    });
  }
}

async function deletarUsuario(req, res) {
  try {
    const usuario = await deletarUser(req.params.id);
    if (!usuario) {
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
    }
    res.json({
      mensagem: "Usuário deletado com sucesso!",
    });
  } catch (err) {
    res.status(500).json({
      erro: err.message,
    });
  }
}
module.exports = {
  listarUsuario,
  criarUsuario,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario,
};
