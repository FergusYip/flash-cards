const { cards_create_card } = require("../db/cards-db");

/*
 * if you need to make calls to additional tables, data stores (Redis, for example),
 * or call an external endpoint as part of creating the blogpost, add them to this service
 */
const createCard = async (userId, stackId, prompt, answer) => {
  try {
    return await cards_create_card(userId, stackId, prompt, answer);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createCard,
};
