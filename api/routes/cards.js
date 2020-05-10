const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Card = require("../models/cards");

router.get("/", (req, res, next) => {
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
});

router.post("/", (req, res, next) => {
    const card = new Card({
        _id: new mongoose.Types.ObjectId(),
        prompt: req.body.prompt,
        answer: req.body.answer,
    });

    Card.save()
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
});

router.get("/:cardId", (req, res, next) => {
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
});

router.patch("/:cardId", (req, res, next) => {
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
});

router.delete("/:cardId", (req, res, next) => {
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
});

module.exports = router;
