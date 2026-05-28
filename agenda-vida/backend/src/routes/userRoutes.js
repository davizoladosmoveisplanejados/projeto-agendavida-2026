const express = require("express");

const router = express.Router();

const { listarUsuario, criarUsuario, buscarUsuarioPorId, atualizarUsuario, deletarUsuario } = require("../controllers/userController.js");

router.get("/usuarios", listarUsuario);

router.post("/usuarios", criarUsuario); 

router.get("/usuarios/:id", buscarUsuarioPorId);

router.put("/usuarios/:id", atualizarUsuario);

router.delete("/usuarios/:id", deletarUsuario);

module.exports = router;