const Sequelize = require("sequelize");

const sequelize = new Sequelize("blognode", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3307
});

sequelize

  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(error => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
