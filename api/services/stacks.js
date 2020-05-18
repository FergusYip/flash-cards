const stackDb = require("../db/stacks");
const userDb = require("../db/user");

exports.getAllStacksService = async () => {
  try {
    const stacks = await stackDb.getAllStacksDB();
    return {
      stacks: stacks,
    };
  } catch (err) {
    throw new Error(err);
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
    throw new Error(err);
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
    throw new Error(err);
  }
};

exports.getStackService = async (stackId) => {
  try {
    const stack = await stackDb.getStackDB(stackId);
    return {
      message: "Successfully obtained stack",
      stacks: stack,
    };
  } catch (err) {
    throw new Error(err);
  }
};
