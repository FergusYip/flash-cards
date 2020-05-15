const mongoose = require("mongoose");

const stackSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
});

stackSchema.method("transform", function () {
  let obj = this.toObject();

  //Rename fields
  obj.stackId = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model("Stack", stackSchema);
