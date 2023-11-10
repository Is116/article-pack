const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router.get("/getComments", async (req, res) => {
    try {
      const { articleId } = req.query;
      const comments = await Comment.find({ articleId });
  
      res.status(200).json({ comments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post("/addComment", async (req, res) => {
    try {
      const { comment, username, articleId } = req.body;
      const newComment = new Comment({ comment, username, articleId });
      await newComment.save();
      res.status(201).json({ comment: newComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/deleteComment/:commentId", async (req, res) => {
    try {
      const { commentId } = req.params;
  
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      await Comment.findByIdAndDelete(commentId);
  
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;
