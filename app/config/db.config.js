module.exports = {
    HOST: "aldente.ceufbwwxxhnk.us-east-2.rds.amazonaws.com",
    USER: "cooper",
    PASSWORD: "cscealdente",
    DB: "aldente",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };