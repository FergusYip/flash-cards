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

exports.addStackDB = async (userId, stackId) => {
  const user = await User.updateOne(
    { _id: userId },
    {
      $addToSet: { stacks: stackId },
    }
  );
  if (!user.nModified) {
    throw new Error("Failed to update user");
  }
};
