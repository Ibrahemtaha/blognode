const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("user", {
  name: {
    type: Sequelize.STRING(255),
    requiered: true,
    allowNull: false,
    validate: {
      len: [3, 10]
    }
  },
  email: {
    type: Sequelize.STRING(255),
    requiered: true,
    allowNull: false,
    isEmail: true
  },
  password: {
    type: Sequelize.STRING(255),
    requiered: true,
    allowNull: false
  }
  // createdAt: { type: dataTypes.DATE },
  // updatedAt: { type: dataTypes.DATE }
});

module.exports = User;
