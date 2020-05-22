require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan"); // Logging package
const bodyParser = require("body-parser");

const authRoutes = require("./api/routes/auth");
const userRoutes = require("./api/routes/user");
const cardRoutes = require("./api/routes/cards");
const stackRoutes = require("./api/routes/stacks");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // * = any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// API Endpoints
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/cards", cardRoutes);
app.use("/stacks", stackRoutes);

// Error Handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.error(error);
  return res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
