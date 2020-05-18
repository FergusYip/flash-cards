const stackDb = require("../db/stacks");
const userDb = require("../db/user");

exports.getAllStacksService = async () => {
  try {
    const stacks = await stackDb.getAllStacksDB();
    return {
      stacks: stacks,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getUserStacksService = async (userId) => {
  try {
    const user = await userDb.getUser(userId);
    return {
      stacks: user.stacks,
      defaultStack: user.defaultStack,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.createStackService = async (userId, name) => {
  try {
    const stack = await stackDb.createStackDB(name);
    await userDb.addStackDB(userId, stack.stackId);
    return {
      message: "Created new stack successfully",
      stack: {
        stackId: stack.stackId,
        name: stack.name,
        cards: stack.cards,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getStackService = async (stackId) => {
  try {
    const stack = await stackDb.getStackDB(stackId);
    return {
      message: "Successfully obtained stack",
      stacks: {
        stackId: stack.stackId,
        name: stack.name,
        cards: stack.cards,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.setStackNameService = async (stackId, name) => {
  try {
    const stack = await stackDb.getStackDB(stackId);

    if (stack.default) {
      throw new Error("Unable to rename default stack.");
    }

    const updatedStack = await stackDb.setStackNameDB(stackId, name);
    return {
      message: "Successfully updated stack name to " + name,
      stack: updatedStack,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteStackSafeService = async (userId, stackId) => {
  try {
    const user = await userDb.getUser(userId);
    const stack = await stackDb.getStackDB(stackId);

    if (stack.default) {
      throw new Error("Unable to delete default stack.");
    }

    const cardIds = stack.cards.map((card) => card.cardId);

    await stackDb.addCardsToStackDB(user.defaultStack.stackId, cardIds);
    await stackDb.deleteStackDB(stackId);

    return {
      message: "Successfully deleted stack and moved cards to default stack",
      stack: {
        stackId: stack.stackId,
        name: stack.name,
        cards: stack.cards,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
