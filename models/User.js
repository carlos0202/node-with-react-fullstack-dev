const mongoose = require("mongoose");
const { Schema } = mongoose;

const userShema = new Schema({
    googleId: String,
    name: String,
    lastName: String,
    gender: String
});

mongoose.model("users", userShema);