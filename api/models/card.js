const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prompt: String,
    responde: String
});

module.exports = mongoose.model('Card', cardSchema);