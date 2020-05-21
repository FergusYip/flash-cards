const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const stackDb = require("../db/stacks");
const userDb = require("../db/user");
const tokenDb = require("../db/token");

exports.registerService = async (email, password, name) => {
  const exisitingUser = await userDb.getUserEmail(email);
  if (exisitingUser) {
    throw new Error("Email provided is already registered.");
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
  try {
    const user = await userDb.getUserEmail(email);

    if (!user) {
      throw new Error("Failed to authenticate user.");
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      throw new Error("Failed to authenticate user.");
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
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.refreshAccessService = async (refreshToken) => {
  try {
    const dbTokenObject = await tokenDb.getTokenDB(refreshToken);

    if (!dbTokenObject) {
      throw new Error("Provided refresh token is not valid.");
    }

    const decoded = jwt.verify(
      dbTokenObject.token,
      process.env.JWT_REFRESH_KEY
    );

    const accessToken = generateAccessToken(decoded.email, decoded.userId);

    return {
      message: "Successfuly refreshed the access token.",
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.verifyAccessService = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    await userDb.getUser(decoded.userId);
    return decoded;
  } catch (err) {
    throw new Error("Failed to authenticate user.");
  }
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
