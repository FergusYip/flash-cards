const mongoose = require("mongoose");

const Card = require("../models/cards");

exports.getAllCardsDB = async () => {
  const cards = await Card.find().select("_id prompt answer").exec();
  return cards.map((card) => card.transform());
};

exports.createCardDB = async (prompt, answer) => {
  const card = new Card({
    _id: new mongoose.Types.ObjectId(),
    prompt: prompt,
    answer: answer,
  });
  await card.save();
  return card.transform();
};

exports.getCardDB = async (cardId) => {
  const card = await Card.findById(cardId).select("_id prompt answer").exec();

  if (!card) {
    throw new Error("No valid entry found for provided cardId.");
  }

  return card.transform();
};

exports.setCardPromptDB = async (cardId, prompt) => {
  const card = await Card.findByIdAndUpdate(
    cardId,
    {
      $set: { prompt: prompt },
    },
    { new: true }
  )
    .select("_id prompt answer")
    .exec();

  if (!card) {
    throw new Error("No valid entry found for provided cardId.");
  }

  return card.transform();
};

exports.setCardAnswerDB = async (cardId, answer) => {
  const card = await Card.findByIdAndUpdate(
    cardId,
    {
      $set: { answer: answer },
    },
    { new: true }
  )
    .select("_id prompt answer")
    .exec();

  if (!card) {
    throw new Error("No valid entry found for provided cardId.");
  }

  return card.transform();
};

exports.deleteCardDB = async (cardId) => {
  const card = await Card.findByIdAndDelete(cardId).exec();

  if (!card) {
    throw new Error("No valid entry found for provided cardId.");
  }

  return card.transform();
};
