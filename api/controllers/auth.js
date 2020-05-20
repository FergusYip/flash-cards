require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const authService = require("../services/auth");

exports.registerController = async (req, res, next) => {
  const { email, password, name } = req.body;

  const input = [email, password, name];
  const inputTypes = input.map((element) => typeof element);

  if (
    inputTypes.some((x) => x == "undefined") ||
    !inputTypes.every((x) => x == "string")
  ) {
    return res.status(400).json({
      error: "Incorrect parameters",
      expected: {
        email: "string",
        password: "string",
        name: "string",
      },
      recieved: req.body,
    });
  }

  try {
    const response = await authService.registerService(email, password, name);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.auth_login = (req, res, next) => {
  const email = req.body.email;
  User.findOne({ email: email })
    .exec()
    .then((user) => {
      if (!user) {
        // User does not exist
        return res.status(401).json({
          message: "Failed to authenticate user",
        });
      } else {
        bcrypt.compare(req.body.password, user.password).then((result) => {
          if (result) {
            const token = jwt.sign(
              {
                email: email,
                userId: user._id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({
              message: "Successfully authenticated user",
              token: token,
              userId: user._id,
            });
          } else {
            // Incorrect password
            return res.status(401).json({
              message: "Failed to authenticate user",
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
};
