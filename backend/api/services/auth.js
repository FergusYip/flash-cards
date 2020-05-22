const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const stackDb = require("../db/stacks");
const userDb = require("../db/user");
const tokenDb = require("../db/token");

const { AuthenticationError, ParameterError } = require("../../utils/error");

exports.registerService = async (email, password, name) => {
  if (![email, password, name].every((x) => typeof x == "string")) {
    throw new ParameterError({
      email: "string",
      password: "string",
      name: "string",
    });
  }

  const exisitingUser = await userDb.getUserEmail(email);

  if (exisitingUser) {
    const error = new Error("Email provided is already registered");
    error.status = 409;
    throw error;
  }

  const hashedPW = await bcrypt.hash(password, 10);
  const defaultStack = await stackDb.createDefaultStackDB();

  const user = await userDb.createUserDB(email, hashedPW, name, defaultStack);

  return {
    message: "Successfully registered a user",
    user: {
      userId: user.userId,
      email: user.email,
      name: user.name,
    },
  };
};

exports.authenticateService = async (email, password) => {
  if (![email, password].every((x) => typeof x == "string")) {
    throw new ParameterError({
      email: "string",
      password: "string",
    });
  }

  const user = await userDb.getUserEmail(email);

  if (!user) {
    throw new AuthenticationError();
  }

  const isCorrect = await bcrypt.compare(password, user.password);

  if (!isCorrect) {
    throw new AuthenticationError();
  }

  const accessToken = generateAccessToken(email, user.userId);
  const refreshToken = generateRefreshToken(email, user.userId);

  await tokenDb.addTokenDB(refreshToken);

  return {
    message: "Successfully authenticated user",
    accessToken: accessToken,
    refreshToken: refreshToken,
    userId: user.userId,
  };
};

exports.refreshAccessService = async (refreshToken) => {
  if (typeof refreshToken != "string") {
    throw new ParameterError({
      refreshToken: "string",
    });
  }

  const dbTokenObject = await tokenDb.getTokenDB(refreshToken);

  if (!dbTokenObject) {
    throw new AuthenticationError("Provided refresh token is not valid");
  }

  const decoded = jwt.verify(dbTokenObject.token, process.env.JWT_REFRESH_KEY);

  const accessToken = generateAccessToken(decoded.email, decoded.userId);

  return {
    message: "Successfuly refreshed the access token",
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

const generateAccessToken = (email, userId) => {
  const accessToken = jwt.sign(
    {
      email: email,
      userId: userId,
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: "15m",
    }
  );
  return accessToken;
};

const generateRefreshToken = (email, userId) => {
  const refreshToken = jwt.sign(
    {
      email: email,
      userId: userId,
    },
    process.env.JWT_REFRESH_KEY,
    {
      expiresIn: "60 days",
    }
  );
  return refreshToken;
};
