const mongoose = require("mongoose");

const Card = require("../models/cards");
const Stack = require("../models/stacks");
const User = require("../models/user");

exports.getAllStacksDB = async (req, res, next) => {
  const stacks = await Stack.find().select("_id name cards").exec();
  return stacks.map((stack) => stack.transform());
};
