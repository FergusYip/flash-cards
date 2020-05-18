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
