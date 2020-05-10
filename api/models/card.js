const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prompt: { type: String, required: true },
    answer: { type: String, required: true },
});

module.exports = mongoose.model("Card", cardSchema);
