const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: String,
    password: String,

    avatar: {
      type: String,
     
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };
