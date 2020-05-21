require("dotenv").config();

const jwt = require("jsonwebtoken");

const User = require("../models/user");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    User.findById(decoded.userId)
      .exec()
      .then((user) => {
        if (!user) {
          // userId does not belong to any user
          return res.status(401).json({
            message: "Failed to authenticate user",
          });
        } else {
          req.tokenPayload = decoded;
          next();
        }
      })
      .catch((err) => {
        return res.status(401).json({
          message: "Failed to authenticate user", // Need better message
        });
      });
  } catch (err) {
    console.error(err);
    res.status(401).json({
      message: "Failed to authenticate user",
    });
  }
};
