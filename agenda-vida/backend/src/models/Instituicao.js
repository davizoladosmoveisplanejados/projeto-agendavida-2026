const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Instituicao = sequelize.define(
  "instituicao",
  {
    id_instituicao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },

    endereco: {
      type: DataTypes.STRING,
      allowNull: false
    },

    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: "instituicao",
    timestamps: false
  }
)

module.exports = Instituicao
