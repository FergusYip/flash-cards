require("dotenv").config();

const { checkAuthService } = require("../services/auth");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    req.tokenPayload = await checkAuthService(token);
    next();
  } catch (err) {
    next(err);
  }
};
