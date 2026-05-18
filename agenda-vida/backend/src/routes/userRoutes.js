const express = require("express")
const User = require("../models/User")

const router = express.Router()

router.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await User.findAll()

    res.json(usuarios)
  } catch (error) {
    res.status(500).json({
      erro: error.message
    })
  }
})

module.exports = router