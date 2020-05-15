const mongoose = require("mongoose");

const Card = require("../models/cards");
const Stack = require("../models/stacks");
const User = require("../models/user");

const cards_get_all = (req, res, next) => {
  Card.find()
    .select("_id prompt answer")
    .exec()
    .then((docs) => {
      return docs;
    })
    .catch((err) => {
      throw err;
    });
};

const cards_create_card = (userId, stackId, prompt, answer) => {
  User.findById(userId)
    .exec()
    .then((user) => {
      if (stackId == null) {
        stackId = user.defaultStack;
      }

      const card = new Card({
        _id: new mongoose.Types.ObjectId(),
        prompt: prompt,
        answer: answer,
      });

      return Promise.all([
        Stack.findByIdAndUpdate(stackId, {
          $addToSet: { cards: card },
        }).exec(),
        card.save(),
      ]);
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      throw err;
    });
  return 1;
};

exports.cards_get_card = (req, res, next) => {
  const id = req.params.cardId;

  Card.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No valid entry found for provided ID.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.cards_patch_card = (req, res, next) => {
  const id = req.params.cardId;
  const updateOps = {};
  for (const ops of req.body) {
    console.log(ops);
    updateOps[ops.propName] = ops.value;
  }
  console.log(updateOps);
  Card.update(
    { _id: id },
    {
      $set: updateOps,
    }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.cards_delete_card = (req, res, next) => {
  const id = req.params.cardId;

  Card.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

module.exports = {
  cards_create_card,
};
