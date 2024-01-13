const express = require("express");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const csvRoutes = require("./routes/csvRoutes");

// Import de la connection à la bdd
const { connectDB } = require("./routes/connection");

const app = express();
const port = process.env.LOCAL_PORT;

// Middleware pour la connexion à la base de données
app.use(async (req, res, next) => {
  try {
    const connection = await connectDB();
    req.db = connection;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", csvRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
