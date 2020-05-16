const mongoose = require("mongoose");

const Card = require("../models/cards");
const Stack = require("../models/stacks");
const User = require("../models/user");

exports.stacks_get_all = (req, res, next) => {
  Stack.find()
    // .select("_id prompt answer")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        stacks: docs,
      };
      console.log(docs);
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.stacks_get_stacks = (req, res, next) => {
  const userId = req.tokenPayload.userId;
  User.findById(userId)
    .populate("stacks defaultStack", "name cards _id")
    .exec()
    .then((user) => {
      console.log(user);
      res.status(400).json({
        stacks: user.stacks.map((stack) => stack.transform()),
        defaultStack: user.defaultStack.transform(),
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
};

exports.stacks_create_stack = (req, res, next) => {
  const userId = req.tokenPayload.userId;

  const stack = new Stack({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    cards: [],
  });

  stack
    .save()
    .then((result) => {
      return User.update(
        { _id: userId },
        {
          $addToSet: { stacks: result._id },
        }
      );
    })
    .then((result) => {
      // console.log(result);
      return res.status(200).json({
        message: "Created new stack successfully",
        stack: {
          stackId: stack._id,
          name: stack.name,
          cards: stack.cards,
        },
        // result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
};

exports.stacks_get_stack = (req, res, next) => {
  const id = req.params.stackId;
  Stack.findById(id)
    .populate("cards", "_id prompt answer")
    .exec()
    .then((stack) => {
      if (stack) {
        res.status(200).json({
          message: "Successfully obtained stack",
          stack: {
            stackId: stack._id,
            name: stack.name,
            cards: stack.cards.map((card) => card.transform()),
          },
        });
      } else {
        res.status(404).json({
          message: "No valid entry found for provided ID.",
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

exports.stacks_patch_stack = (req, res, next) => {
  const id = req.params.stackId;
  const updateOps = {};
  for (const ops of req.body) {
    console.log(ops);
    updateOps[ops.propName] = ops.value;
  }
  console.log(updateOps);
  Stack.update(
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

exports.stacks_delete_stack = (req, res, next) => {
  const stackId = req.params.stackId;
  const userId = req.tokenPayload.userId;

  Stack.findById(stackId)
    .exec()
    .then((stack) => {
      if (!stack) {
        return res.status(400).json({
          stackId: stackId,
          error: "No valid entry found for provided stackId.",
        });
      } else if (stack.default == true) {
        return res.status(400).json({
          error: "Unable to delete default stack",
        });
      } else {
        return Stack.deleteOne({ _id: stackId });
      }
    })
    .then(() => {
      return User.update({ _id: userId }, { $pull: { stacks: stackId } });
    })
    .then((result) => {
      res.status(200).json({
        message: "Successfully deleted stack",
        stack: stack,
        // result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Add a card to the stack
exports.stacks_add_card = (req, res, next) => {
  const id = req.params.stackId;
  const cardID = req.body.cardId;

  Card.findById(cardID)
    .then((doc) => {
      if (doc) {
        return Stack.update(
          { _id: id },
          {
            $addToSet: { cards: doc._id },
          }
        );
      } else {
        return res.status(400).json({
          cardID: cardID,
          error: "No valid entry found for provided ID.",
        });
      }
    })
    .then((result) => {
      return res.status(200).json({
        message: "Successfully added card to stack",
        // result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        cardID: cardID,
        error: err,
      });
    });
};

// Remove card from the stack
// Body = Array of ObjectIDs
exports.stacks_remove_card = (req, res, next) => {
  const id = req.params.stackID;
  const cardID = req.body.cardID;

  Card.findById(cardID)
    .then((doc) => {
      if (doc) {
        return Stack.update(
          { _id: id },
          {
            $pull: { cards: doc._id },
          }
        );
      } else {
        res.status(400).json({
          cardID: cardID,
          error: "No valid entry found for provided ID.",
        });
      }
    })
    .then((result) => {
      if (result.nModified == 0) {
        res.status(400).json({
          error: "Failed to remove card from stack",
          result: result,
        });
      } else {
        res.status(200).json({
          message: "Removed card from stack",
          result: result,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        cardID: cardID,
        error: err,
      });
    });
};

// Add multiple cards to the stack
exports.stacks_add_cards = (req, res, next) => {
  const stackId = req.params.stackId;
  const cardIds = req.body.cardIds;

  Card.find({ _id: { $in: cardIds } })
    .exec()
    .then((result) => {
      const resultIds = result.map((card) => card._id.toString());
      const invalidIds = cardIds.filter(
        (cardId) => resultIds.includes(cardId) == false
      );
      if (invalidIds.length) {
        return res.status(400).json({
          cardIds: invalidIds,
          error: "No valid entry found for the provided cardId(s).",
        });
      }
      console.log(typeof resultIds[0]);
      return Stack.findByIdAndUpdate(
        stackId,
        {
          $addToSet: { cards: { $each: resultIds } },
        },
        { new: true }
      )
        .select("_id name cards")
        .exec();
    })
    .then((stack) => {
      return res.status(200).json({
        message:
          "Successfully added " + cardIds.length + " cards to the stack.",
        stack: stack.transform(),
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });

  // Card.findById(cardID)
  //   .then((doc) => {
  //     if (doc) {
  //       return Stack.update(
  //         { _id: id },
  //         {
  //           $addToSet: { cards: doc._id },
  //         }
  //       );
  //     } else {
  //       return res.status(400).json({
  //         cardID: cardID,
  //         error: "No valid entry found for provided ID.",
  //       });
  //     }
  //   })
  //   .then((result) => {
  //     return res.status(200).json({
  //       message: "Successfully added card to stack",
  //       // result: result,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({
  //       cardID: cardID,
  //       error: err,
  //     });
  //   });
};
