const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")
const Exame = require("./Exame")

const Horario = sequelize.define(
  "horario",
  {
    id_horario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    hora: {
      type: DataTypes.DATE,
      allowNull: false
    },

    disponibilidade: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },

    id_exame: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Exame,
        key: "id_exame"
      }
    }
  },
  {
    tableName: "horario",
    timestamps: false
  }
)

// Associações
Exame.hasMany(Horario, { foreignKey: "id_exame" })
Horario.belongsTo(Exame, { foreignKey: "id_exame" })

module.exports = Horario
