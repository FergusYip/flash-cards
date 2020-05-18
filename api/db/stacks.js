const mongoose = require("mongoose");

const Card = require("../models/cards");
const Stack = require("../models/stacks");
const User = require("../models/user");

exports.getAllStacksDB = async () => {
  const stacks = await Stack.find().select("_id name cards").exec();
  return stacks.map((stack) => stack.transform());
};

exports.createStackDB = async (name) => {
  const stack = new Stack({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    cards: [],
  });
  await stack.save();
  return stack.transform();
};

exports.getStackDB = async (stackId) => {
  const stack = await Stack.findById(stackId)
    .select("_id name cards default")
    .populate("cards", "_id prompt answer")
    .exec();

  if (!stack) {
    throw new Error("No valid entry found for provided ID.");
  }

  return {
    stackId: stack._id,
    name: stack.name,
    cards: stack.cards.map((card) => card.transform()),
    default: stack.default,
  };
};

exports.setStackNameDB = async (stackId, name) => {
  const stack = await Stack.findByIdAndUpdate(
    stackId,
    {
      $set: { name: name },
    },
    { new: true }
  )
    .select("_id name cards")
    // .populate("cards", "_id prompt answer")
    .exec();

  if (!stack) {
    throw new Error("No valid entry found for provided ID.");
  }

  return {
    stackId: stack._id,
    name: stack.name,
    cards: stack.cards.map((card) => card.transform()),
  };
};
