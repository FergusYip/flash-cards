const userDb = require("../db/user");

exports.getDetailsService = async (userId) => {
  const user = await userDb.getUser(userId);
  return {
    message: "Successfully obtained user details",
    user: {
      userId: user.userId,
      name: user.name,
      email: user.email,
    },
  };
};

exports.setEmailService = async (userId, email) => {
  const user = await userDb.setEmailDB(userId, email);
  return {
    message: "Successfully changed user email",
    user: {
      userId: user.userId,
      name: user.name,
      email: user.email,
    },
  };
};

exports.setNameService = async (userId, name) => {
  const user = await userDb.setNameDB(userId, name);
  return {
    message: "Successfully changed user name",
    user: {
      userId: user.userId,
      name: user.name,
      email: user.email,
    },
  };
};

exports.deleteUserService = async (userId) => {
  const user = await userDb.deleteUserDB(userId);

  return {
    message: "Successfully deleted user",
    user: {
      userId: user.userId,
      name: user.name,
      email: user.email,
    },
  };
};
