const mysql = require("mysql2/promise");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

// Configuration de la connexion à la base de données
const dbConfig = {
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "test_backend",
  socketPath: "/var/run/mysqld/mysqld.sock",
};

// Fonction pour établir la connexion à la base de données
const connectDB = async () => {
  try {
    console.log("DB_USER:", process.env.DB_USER);
    console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

module.exports = { connectDB };
