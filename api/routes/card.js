const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Card = require("../models/card");

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /card",
    });
});

router.post("/create", (req, res, next) => {
    const card = new Card({
        _id: new mongoose.Types.ObjectId(),
        prompt: req.body.prompt,
        response: req.body.response,
    });
    card.save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });

    res.status(200).json({
        message: "Handling POST request to /card",
        card: card,
    });
});

router.get("/:cardId", (req, res, next) => {
    const id = req.params.cardId;
    res.status(200).json({
        method: "GET",
        id: id,
    });
});

router.patch("/:cardId", (req, res, next) => {
    const id = req.params.cardId;
    res.status(200).json({
        method: "PATCH",
        id: id,
    });
});

router.delete("/:cardId", (req, res, next) => {
    const id = req.params.cardId;
    res.status(200).json({
        method: "DELETE",
        id: id,
    });
});

module.exports = router;
