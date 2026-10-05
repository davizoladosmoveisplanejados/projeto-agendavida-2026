const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")
const Instituicao = require("./Instituicao")

const Exame = sequelize.define(
  "exame",
  {
    id_exame: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nome_exame: {
      type: DataTypes.STRING,
      allowNull: false
    },

    descricao: {
      type: DataTypes.STRING,
      allowNull: true
    },

    id_instituicao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Instituicao,
        key: "id_instituicao"
      }
    }
  },
  {
    tableName: "exame",
    timestamps: false
  }
)

// Associações
Instituicao.hasMany(Exame, { foreignKey: "id_instituicao" })
Exame.belongsTo(Instituicao, { foreignKey: "id_instituicao" })

module.exports = Exame
