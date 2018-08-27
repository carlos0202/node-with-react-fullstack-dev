const mongoose = require("mongoose");
const { Schema } = mongoose;

const userShema = new Schema({
  googleId: String,
  name: String,
  lastName: String,
  gender: String,
  credits: { type: Number, default: 0 }
});

mongoose.model("users", userShema);
