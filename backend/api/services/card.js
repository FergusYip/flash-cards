const cardDb = require("../db/cards");
const userDb = require("../db/user");
const stackDb = require("../db/stacks");

exports.getAllCardsService = async () => {
  const cards = await cardDb.getAllCardsDB();
  return {
    cards: cards,
  };
};

exports.createCardService = async (userId, prompt, answer, stackId) => {
  const card = await cardDb.createCardDB(prompt, answer);
  const user = await userDb.getUser(userId);

  if (!stackId) {
    stackId = user.defaultStack.stackId;
  }

  await stackDb.addCardsDB(stackId, [card.cardId]);

  return {
    message: "Created new card successfully",
    card: card,
  };
};

exports.getCardService = async (cardId) => {
  const card = await cardDb.getCardDB(cardId);
  return {
    message: "Successfully obtained card",
    card: card,
  };
};

exports.setCardPromptService = async (cardId, prompt) => {
  const card = await cardDb.setCardPromptDB(cardId, prompt);
  return {
    message: "Successfully updated card prompt to " + prompt,
    card: card,
  };
};

exports.setCardAnswerService = async (cardId, answer) => {
  const card = await cardDb.setCardAnswerDB(cardId, answer);
  return {
    message: "Successfully updated card answer to " + answer,
    card: card,
  };
};
