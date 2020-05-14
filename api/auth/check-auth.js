const jwt = require("jsonwebtoken");

const User = require("../models/user");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    User.findById(decoded.userId)
      .exec()
      .then((user) => {
        if (!user) {
          // userId does not belong to any user
          res.status(401).json({
            message: "Failed to authenticate user",
          });
        } else {
          req.tokenPayload = decoded;
          next();
        }
      })
      .catch((err) => {
        res.status(401).json({
          message: "Failed to authenticate user", // Need better message
        });
      });
  } catch {
    res.status(401).json({
      message: "Failed to authenticate user",
    });
  }
};
