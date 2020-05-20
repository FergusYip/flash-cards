const mongoose = require("mongoose");

const Token = require("../models/token");

exports.checkValidDB = async (token) => {
  const token = await Token.findOne({ token: token }).exec();
  return Boolean(token);
};

exports.getTokenDB = async (token) => {
  const token = await Token.findOne({ token: token }).exec();
  return token;
};
