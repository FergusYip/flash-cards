const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  prompt: { type: String, required: true },
  answer: { type: String, required: true },
});

cardSchema.method("transform", function () {
  let obj = this.toObject();

  //Rename fields
  obj.cardId = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model("Card", cardSchema);
