const stackDb = require("../db/stacks");
const userDb = require("../db/user");
const cardDb = require("../db/cards");

const { ParameterError } = require("../../utils/error");

exports.getAllStacksService = async () => {
  const stacks = await stackDb.getAllStacksDB();
  return {
    stacks: stacks,
  };
};

exports.getUserStacksService = async (userId) => {
  const user = await userDb.getUser(userId);
  return {
    message: "Successfully obtained all stacks",
    stacks: user.stacks,
    defaultStack: user.defaultStack,
  };
};

exports.createStackService = async (userId, name) => {
  if (typeof name != "string") {
    throw new ParameterError({
      name: "string",
    });
  }

  const stack = await stackDb.createStackDB(name);
  await userDb.addStackDB(userId, stack.stackId);
  return {
    message: "Successfully created a new stack",
    stack: {
      stackId: stack.stackId,
      name: stack.name,
      cards: stack.cards,
    },
  };
};

exports.getStackService = async (stackId) => {
  const stack = await stackDb.getStackDB(stackId);
  return {
    message: "Successfully obtained stack",
    stacks: {
      stackId: stack.stackId,
      name: stack.name,
      cards: stack.cards,
    },
  };
};

exports.setStackNameService = async (stackId, name) => {
  if (typeof name != "string") {
    throw new ParameterError({
      name: "string",
    });
  }

  const stack = await stackDb.getStackDB(stackId);

  if (stack.default) {
    const error = new Error("Unable to rename default stack");
    error.status = 400;
    throw error;
  }

  const updatedStack = await stackDb.setStackNameDB(stackId, name);
  return {
    message: "Successfully updated stack name to " + name,
    stack: updatedStack,
  };
};

exports.deleteStackSafeService = async (userId, stackId) => {
  const user = await userDb.getUser(userId);
  const stack = await stackDb.getStackDB(stackId);

  if (stack.default) {
    const error = new Error("Unable to delete default stack");
    error.status = 400;
    throw error;
  }

  const cardIds = stack.cards.map((card) => card.cardId);

  await stackDb.addCardsDB(user.defaultStack.stackId, cardIds);
  await stackDb.deleteStackDB(stackId);

  return {
    message: "Successfully deleted stack and moved cards to default stack",
    stack: {
      stackId: stack.stackId,
      name: stack.name,
      cards: stack.cards,
    },
  };
};

exports.deleteUnsafeService = async (stackId) => {
  const stack = await stackDb.getStackDB(stackId);

  if (stack.default) {
    const error = new Error("Unable to delete default stack");
    error.status = 400;
    throw error;
  }

  const cardIds = stack.cards.map((card) => card.cardId);

  await cardDb.deleteCardsDB(cardIds);
  await stackDb.deleteStackDB(stackId);

  return {
    message: "Successfully deleted stack and all contained cards",
    stack: {
      stackId: stack.stackId,
      name: stack.name,
      cards: stack.cards,
    },
  };
};

exports.addCardService = async (stackId, cardId) => {
  if (typeof cardId != "string") {
    throw new ParameterError({
      cardId: "string",
    });
  }

  const card = await cardDb.getCardDB(cardId);
  const stack = await stackDb.addCardsDB(stackId, [cardId]);

  return {
    message: "Successfully added card to stack",
    card: card,
    stack: stack,
  };
};

exports.addCardsService = async (stackId, cardIds) => {
  if (
    !(cardIds instanceof Array) ||
    !cardIds.every((cardId) => cardId instanceof String)
  ) {
    throw new ParameterError({
      cardIds: "array of strings",
    });
  }

  const cards = await cardDb.getCardsDB(cardIds);
  const stack = await stackDb.addCardsDB(stackId, cardIds);

  return {
    message: "Successfully added " + cardIds.length + " card(s) to stack",
    card: cards,
    stack: stack,
  };
};

exports.removeCardService = async (stackId, cardId) => {
  if (typeof cardId != "string") {
    throw new ParameterError({
      cardId: "string",
    });
  }

  const card = await cardDb.getCardDB(cardId);
  const stack = await stackDb.removeCardsDB(stackId, [cardId]);
  await cardDb.deleteCardDB(cardId);

  return {
    message: "Successfully removed card from stack",
    card: card,
    stack: stack,
  };
};

exports.removeCardsService = async (stackId, cardIds) => {
  if (
    !(cardIds instanceof Array) ||
    !cardIds.every((cardId) => cardId instanceof String)
  ) {
    throw new ParameterError({
      cardIds: "array of strings",
    });
  }

  const cards = await cardDb.getCardsDB(cardIds);
  const stack = await stackDb.removeCardsDB(stackId, cardIds);
  await cardDb.deleteCardsDB(cardIds);

  return {
    message: "Successfully removed " + cardIds.length + "card(s) from stack",
    card: cards,
    stack: stack,
  };
};
