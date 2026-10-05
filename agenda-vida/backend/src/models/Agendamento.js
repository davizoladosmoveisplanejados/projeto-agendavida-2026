const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")
const User = require("./User")
const Horario = require("./Horario")

const Agendamento = sequelize.define(
  "agendamento",
  {
    id_agendamento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    data_agendamento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },

    // 'ativo' = true, 'cancelado' = false
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },

    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id_usuario"
      }
    },

    id_horario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Horario,
        key: "id_horario"
      }
    }
  },
  {
    tableName: "agendamento",
    timestamps: false
  }
)

// Associações
User.hasMany(Agendamento, { foreignKey: "id_usuario" })
Agendamento.belongsTo(User, { foreignKey: "id_usuario" })

Horario.hasMany(Agendamento, { foreignKey: "id_horario" })
Agendamento.belongsTo(Horario, { foreignKey: "id_horario" })

module.exports = Agendamento
