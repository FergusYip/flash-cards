const mongoose = require("mongoose");

const Card = require("../models/cards");
const Stack = require("../models/stacks");
const User = require("../models/user");

exports.getUser = async (userId) => {
  const user = await User.findById(userId)
    .populate("stacks defaultStack", "name cards _id")
    .exec();

  return {
    userId: user._id,
    cards: user.cards,
    stacks: user.stacks.map((stack) => stack.transform()),
    email: user.email,
    defaultStack: user.defaultStack.transform(),
  };
};
