const User = require("../models/user");

const userService = require("../services/user");

exports.getDetailsController = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const response = await userService.getDetailsService(userId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.setEmailController = async (req, res, next) => {
  const userId = req.params.userId;
  const { email } = req.body;

  try {
    const response = await userService.setEmailService(userId, email);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.setNameController = async (req, res, next) => {
  const userId = req.params.userId;
  const { name } = req.body;

  try {
    const response = await userService.setNameService(userId, name);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteUserController = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const response = await userService.deleteUserService(userId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
