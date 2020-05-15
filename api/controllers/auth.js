const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Stack = require("../models/stacks");

exports.auth_register = (req, res, next) => {
  const email = req.body.email;
  User.findOne({ email: email })
    .exec()
    .then((user) => {
      if (user) {
        return res.status(409).json({
          message: "Email provided is already registered",
        });
      } else {
        return bcrypt.hash(req.body.password, 10);
      }
    })
    .then((hash) => {
      const defaultStack = new Stack({
        _id: new mongoose.Types.ObjectId(),
        name: "(default)",
      });
      defaultStack
        .save()
        .then((stack) => {
          console.log("Created default stack");
          console.log(stack);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "An error occured while created the default stack",
            error: err,
          });
        });
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        password: hash,
        name: req.body.name,
        defaultStack: defaultStack,
      });
      return user.save();
    })
    .then((user) => {
      return res.status(200).json({
        message: "Sign up successful",
        user: {
          userId: user._id,
          email: user.email,
          name: user.name,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
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
            console.log(user);
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
      console.log("run after");
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
};
