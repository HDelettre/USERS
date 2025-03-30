// IMPORT PACKAGES
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Paramètre rate Limit
const limiter = rateLimit({
  max: 100, // 100 requêtes maximum
  windowMs: 60 * 60 * 1000, // 1 heure
  message: "Vous avez atteint la limite de requête, essayer plus tard !",
});

// LOADING ENVIRONMENT VARIABLES - PORT_USED
require("dotenv").config({
  path: "./config/.env",
});

// PATH TO ROUTES
const routesUsers = require("./routes/users");

// MYSQL / SEQUELIZE
const sequelize = require("./config/database");
// Synchronization of models
require("./models/users");

sequelize.sync({ alter: true });
// sequelize.sync({ force: true });

const app = express()

app.use("/pictures", express.static(__dirname + "/pictures"));

// Application helmet à application */
app.use(helmet());

// Application package rate-limt
app.use("/api/users", limiter);

// CORS
const cors = require("cors");
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
// ROUTES CALLING
app.use("/api/users",limiter, routesUsers);

console.log("RATE LIMITER: ", limiter.statusCode);

// EXPORTS
module.exports = app;
