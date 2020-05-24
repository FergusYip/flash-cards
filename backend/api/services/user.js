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
  if (typeof email != "string") {
    throw new ParameterError({
      email: "string",
    });
  }

  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (!emailRegex.test(email)) {
    const error = new Error("Email provided is not valid");
    error.status = 409;
    throw error;
  }

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
  if (typeof name != "string") {
    throw new ParameterError({
      name: "string",
    });
  }

  if (name.length < 1 || name.length > 50) {
    const error = new Error(
      "Name must be between 1 and 50 characters inclusive"
    );
    error.status = 409;
    throw error;
  }

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
