const cardDb = require("../db/cards");
const userDb = require("../db/user");
const stackDb = require("../db/stacks");

exports.getAllCardsService = async () => {
  try {
    const cards = await cardDb.getAllCardsDB();
    return {
      cards: cards,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.createCardService = async (userId, prompt, answer, stackId) => {
  try {
    const card = await cardDb.createCardDB(prompt, answer);
    const user = await userDb.getUser(userId);

    if (!stackId) {
      stackId = user.defaultStack.stackId;
    }

    await userDb.addCardDB(userId, card.cardId, stackId);

    return {
      message: "Created new card successfully",
      card: card,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getCardService = async (cardId) => {
  try {
    const card = await cardDb.getCardDB(cardId);
    return {
      message: "Successfully obtained card",
      card: card,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.setCardPromptService = async (cardId, prompt) => {
  try {
    const card = await cardDb.setCardPromptDB(cardId, prompt);
    return {
      message: "Successfully updated card prompt to " + prompt,
      card: card,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.setCardAnswerService = async (cardId, answer) => {
  try {
    const card = await cardDb.setCardPromptDB(cardId, answer);
    return {
      message: "Successfully updated card answer to " + answer,
      card: card,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
