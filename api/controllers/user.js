const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.user_get_details = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .exec()
    .then((user) => {
      if (user) {
        res.status(200).json({
          userId: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(404).json({
          message: "No valid entry found for provided ID.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_set_email = (req, res, next) => {
  const userId = req.params.userId;
  const newEmail = req.body.email;
  User.findByIdAndUpdate(
    userId,
    {
      $set: { email: newEmail },
    },
    { new: true }
  )
    .exec()
    .then((user) => {
      if (user) {
        // if (user.email == newEmail) {
        //   return res.status(400).json({
        //     message: "New email is the same as the current email",
        //     user: {
        //       userId: user._id,
        //       name: user.name,
        //       email: user.email,
        //     },
        //   });
        // }
        return res.status(200).json({
          message: "Successfully updated email",
          user: {
            userId: user._id,
            name: user.name,
            email: user.email,
          },
        });
      } else {
        return res.status(404).json({
          message: "No valid entry found for provided ID.",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

exports.user_set_name = (req, res, next) => {
  const userId = req.params.userId;
  const newName = req.body.name;
  User.findByIdAndUpdate(
    userId,
    {
      $set: { name: newName },
    },
    { new: true }
  )
    .exec()
    .then((user) => {
      if (user) {
        // if (user.name == newName) {
        //   return res.status(400).json({
        //     message: "New name is the same as the current name",
        //     user: {
        //       userId: user._id,
        //       name: user.name,
        //       email: user.email,
        //     },
        //   });
        // }
        return res.status(200).json({
          message: "Successfully updated name",
          user: {
            userId: user._id,
            name: user.name,
            email: user.email,
          },
        });
      } else {
        return res.status(404).json({
          message: "No valid entry found for provided ID.",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

exports.user_delete = (req, res, next) => {
  const userId = req.params.userId;
  User.findByIdAndRemove(userId)
    .exec()
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "No valid entry found for provided ID.",
        });
      } else {
        res.status(200).json({
          message: "Successfully removed user",
          // user: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
