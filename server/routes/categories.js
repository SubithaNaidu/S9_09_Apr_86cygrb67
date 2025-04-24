const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Category = require('../models/Category');
const Post = require("../models/Post")

router.post('/add', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ status: true, message: 'Category created', data: category });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ status: true, data: categories });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ status: false, message: 'Category not found' });
    }
    res.status(200).json({ status: true, data: category });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id,req.body, { new: true });
    if (!category) {
      return res.status(404).json({ status: false, message: 'Category not found' });
    }
    res.status(200).json({ status: true, message: 'Category updated', data: category });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ status: false, message: 'Category not found' });
    }
    res.status(200).json({ status: true, message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});



router.get("/count/category", async (req, res) => {
  try {
    const counts = await Category.aggregate([
      {
        $lookup: {
          from: "posts", 
          localField: "_id",
          foreignField: "category",
          as: "posts"
        }
      },
      {
        $project: {
          _id: 0,
          categoryId: "$_id",
          categoryName: "$name",
          categoryDescription: "$description",
          createdAt:"$createdAt",
          count: { $size: "$posts" }
        }
      }
    ]);

    res.status(200).json({ status: true, data: counts });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});




module.exports = router;
