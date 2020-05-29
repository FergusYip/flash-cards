require("dotenv").config();

const checkEnvVars = require("./utils/check-env");
checkEnvVars();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

let db = mongoose.connection;
// db.on("error", console.error.bind(console, "Mongooose: Connection error"));

const app = require("./app");
const port = process.env.PORT || 3000;

app.listen(port);
