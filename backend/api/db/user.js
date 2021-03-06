const mongoose = require("mongoose");

const User = require("../models/user");

exports.getUser = async (userId) => {
  const user = await User.findById(userId)
    .populate("stacks defaultStack", "name cards _id")
    .exec();

  if (!user) {
    throw new Error("No valid entry for provided userId.");
  }

  return {
    userId: user._id,
    name: user.name,
    cards: user.cards,
    stacks: user.stacks.map((stack) => stack.transform()),
    email: user.email,
    defaultStack: user.defaultStack.transform(),
  };
};

exports.getUserEmail = async (email) => {
  const user = await User.findOne({ email: email }).exec();
  if (user) return user.transform();
};

exports.createUserDB = async (email, password, name, defaultStack) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: email,
    password: password,
    name: name,
    defaultStack: defaultStack,
  });
  await user.save();
  return user.transform();
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

exports.setEmailDB = async (userId, email) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: { email: email },
    },
    { new: true }
  ).exec();
  return user.transform();
};

exports.setNameDB = async (userId, name) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: { name: name },
    },
    { new: true }
  ).exec();
  return user.transform();
};

exports.deleteUserDB = async (userId) => {
  const user = await User.findByIdAndDelete(userId).exec();
  return user.transform();
};
