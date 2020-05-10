const mongoose = require("mongoose");

const stackSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    // card: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
    // cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
});

module.exports = mongoose.model("Stack", stackSchema);
