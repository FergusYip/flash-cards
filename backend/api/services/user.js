const userDb = require("../db/user");

exports.getDetailsService = async (userId) => {
  try {
    const user = await userDb.getUser(userId);
    return {
      message: "Successfully obtained user details",
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.setEmailService = async (userId, email) => {
  try {
    const user = await userDb.setEmailDB(userId, email);
    return {
      message: "Successfully changed user email",
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.setNameService = async (userId, name) => {
  try {
    const user = await userDb.setNameDB(userId, name);
    return {
      message: "Successfully changed user name",
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteUserService = async (userId) => {
  try {
    const user = await userDb.deleteUserDB(userId);

    return {
      message: "Successfully deleted user",
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
