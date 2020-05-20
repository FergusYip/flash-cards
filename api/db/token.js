const mongoose = require("mongoose");

const Token = require("../models/token");

exports.getTokenDB = async (token) => {
  return await Token.findOne({ token: token }).exec();
};
