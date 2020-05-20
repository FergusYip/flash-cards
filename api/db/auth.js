const mongoose = require("mongoose");

const Token = require("../models/token");

exports.getTokenDB = async (token) => {
  const token = await Token.findOne({ token: token }).exec();
  return token;
};
