const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientShema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

module.exports = recipientShema;