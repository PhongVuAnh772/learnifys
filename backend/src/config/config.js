require("dotenv").config();

module.exports = {
  development: {
    username: "postgres",
    password: "22092002",
    database: "learnify",
    host: "127.0.0.1",
    port: "5432",
    dialect: "postgres",
    define: {
      freezeTableName: true,
    },
    timezone: "+07:00",
    logging: true,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
