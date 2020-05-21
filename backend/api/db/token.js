const mongoose = require("mongoose");

const Token = require("../models/token");

exports.getTokenDB = async (token) => {
  return await Token.findOne({ token: token }).exec();
};

exports.addTokenDB = async (token) => {
  const tokenObject = new Token({
    _id: new mongoose.Types.ObjectId(),
    token: token,
  });
  await tokenObject.save();
  return token;
};
