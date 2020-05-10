const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Stack = require("../models/stacks");

router.get("/", (req, res, next) => {
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
});

router.post("/", (req, res, next) => {
    const stack = new Stack({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        cards: [],
    });

    stack
        .save()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: "Created new stack successfully",
                stack: stack,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

router.get("/:stackId", (req, res, next) => {
    const id = req.params.stackId;
    Stack.findById(id)
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

router.patch("/:stackId", (req, res, next) => {
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
});

router.delete("/:stackId", (req, res, next) => {
    const id = req.params.stackId;

    Stack.remove({ _id: id })
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