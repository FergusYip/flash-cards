const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  name: { type: String, required: true },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
  stacks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stack",
    },
  ],
  defaultStack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stack",
    required: true,
  },
});

userSchema.method("transform", function () {
  let obj = this.toObject();

  //Rename fields
  obj.userId = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model("User", userSchema);
