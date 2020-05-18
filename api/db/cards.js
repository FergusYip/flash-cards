const mongoose = require("mongoose");

const Card = require("../models/cards");
const Stack = require("../models/stacks");
const User = require("../models/user");

exports.getCardDB = async (cardId) => {
  const card = await Card.findById(cardId).select("_id prompt answer").exec();

  if (!card) {
    throw new Error("No valid entry found for provided cardId.");
  }

  return card.transform();
};
