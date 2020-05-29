require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan"); // Logging package
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");

const authRoutes = require("./api/routes/auth");
const userRoutes = require("./api/routes/user");
const cardRoutes = require("./api/routes/cards");
const stackRoutes = require("./api/routes/stacks");

const { NotFoundError } = require("./utils/error");

app.use(helmet());
app.use(compression()); //Compress all routes
app.use(morgan("short"));
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
  next(new NotFoundError());
});

app.use((error, req, res, next) => {
  // console.error(error);

  const response = {
    error: {
      name: error.name,
      message: error.message,
    },
  };

  if (error.name == "ParameterError") {
    response.error.expected = error.expected;
    response.error.received = req.body;
  }

  return res.status(error.status || 500).json(response);
});

module.exports = app;
