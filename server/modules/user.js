const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  refreshToken: String,
  roles: {
    User: {
      type: Number,
      default: 2093,
    },
    Admin: Number,
    Teacher: Number,
    Student: Number,
    Therapist: Number,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
