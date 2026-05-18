const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const User = sequelize.define(
  "usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nome: {
      type: DataTypes.STRING
    },

    tipo: {
      type: DataTypes.STRING
    },

    cpf: {
      type: DataTypes.STRING
    },

    email: {
      type: DataTypes.STRING
    },

    telefone: {
      type: DataTypes.STRING
    },

    senha: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: "usuario",
    timestamps: false
  }
)

module.exports = User