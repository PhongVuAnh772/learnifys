const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,

  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: true,
  }
);

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("connectDB successfully");
  } catch (error) {
    console.log("connectDB failure", error);
  }
};

module.exports = connectDB;
