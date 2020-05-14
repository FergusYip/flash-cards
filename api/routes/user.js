const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  const email = req.body.email;
  User.findOne({ email: email })
    .exec()
    .then((user) => {
      if (user) {
        return res.status(409).json({
          message: "Email provided is already registered",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: email,
              password: hash,
              name: req.body.name,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(200).json({
                  message: "Sign up successful",
                  userId: user._id,
                  email: user.email,
                  name: user.name,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

router.delete("/:userId", (req, res, next) => {
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
});

module.exports = router;
