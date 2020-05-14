const mongoose = require("mongoose");

const Card = require("../models/cards");

exports.cards_get_all = (req, res, next) => {
  Card.find()
    .select("_id prompt answer")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        cards: docs,
        // cards: docs.map((doc) => {
        //     return {
        //         _id: doc._id,
        //         prompt: doc.prompt,
        //         answer: doc.answer,
        //         request: {
        //             type: "GET",
        //             url: "http://localhost:3000/card/" + doc._id,
        //         },
        //     };
        // }),
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

exports.cards_create_card = (req, res, next) => {
  const card = new Card({
    _id: new mongoose.Types.ObjectId(),
    prompt: req.body.prompt,
    answer: req.body.answer,
  });

  card
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Created new card successfully",
        card: card,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
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
