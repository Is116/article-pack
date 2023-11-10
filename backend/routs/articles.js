const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const Article = require("../models/article");

// add new category
router.post("/addCategory", async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const newCategory = new Category({
      name,
      description,
      image,
    });
    await newCategory.save();
    res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// update category
router.put("/updateCategory/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;
    await Category.findByIdAndUpdate(id, {
      name,
      description,
      image,
    });
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// get all categories
router.get("/getCategories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// get category by id
router.get("/getCategory/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(200).json({ category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// delete category
router.delete("/deleteCategory/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// add new article
router.post("/addArticle", async (req, res) => {
  try {
    const { name, category, content, status, image, author } = req.body;
    const newArticle = new Article({
      name,
      category,
      content,
      status,
      image,
      author,
    });
    await newArticle.save();
    res.status(201).json({ message: "Article added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// update an article
router.put("/updateArticle/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, content, status, image, author } = req.body;
    await Article.findByIdAndUpdate(id, {
      name,
      category,
      content,
      status,
      image,
      author,
    });
    res.status(200).json({ message: "Article updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// get all articles
router.get("/getArticles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json({ articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getUserArticles", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const articles = await Article.find({ author: userId });

    res.status(200).json({ articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// delete article
router.delete("/deleteArticle/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// get article by id
router.get("/getArticle/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    res.status(200).json({ article });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
