const stackDb = require("../db/stacks");

exports.getStacks = async (req, res, next) => {
  try {
    return await stackDb.getAllStacks();
  } catch (err) {
    throw new Error(err);
  }
};
