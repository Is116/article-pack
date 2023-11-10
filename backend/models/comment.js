const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: () => new Date(),
  },
  comment: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);

