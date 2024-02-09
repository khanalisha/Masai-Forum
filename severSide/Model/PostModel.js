const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: 100 },
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: {
      type: String,
      enum: ["Development", "Design", "Innovation", "Tutorial", "Business"],
    },
    content: String,

    media: [String],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // reference to User who made the comment
        content: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Post", PostSchema);

module.exports = { postModel };
