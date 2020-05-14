const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
    stacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stack" }],
});

module.exports = mongoose.model("User", userSchema);
