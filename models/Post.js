const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Post = sequelize.define("Post", {
  title: {
    type: Sequelize.STRING,
    requiered: true,
    allowNull: false,
    validate: {
      len: [3, 100]
    }
  },
  content: {
    type: Sequelize.STRING,
    requiered: true,
    allowNull: false,
    validate: {
      len: [3, 500]
    }
  },
  createdAt: { type: Sequelize.DATE }
  //updatedAt: { type: dataTypes.DATE }
});

module.exports = Post;
