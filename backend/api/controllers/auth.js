const authService = require("../services/auth");

exports.registerController = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const response = await authService.registerService(email, password, name);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const response = await authService.authenticateService(email, password);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.refreshAccessController = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;

  try {
    const response = await authService.refreshAccessService(refreshToken);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
