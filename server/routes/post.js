const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");
const Post = require("../models/Post");
const mongoose = require("mongoose");

// CREATE POST
router.post("/create", verifyToken, async (req, res) => {
  try {
    // Check if user exists in token
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized: Invalid token or user info",
      });
    }

    const { title, content, category } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        status: false,
        message: "Please fill all required fields (title, content)",
      });
    }

    // Check for existing post title
    const existingPost = await Post.findOne({ title });
    if (existingPost) {
      return res.status(400).json({
        status: false,
        message: "Post title already exists",
      });
    }

    // Create and save new post
    const newPost = new Post({
      title,
      content,
      author: req.user.id,
      category,
    });

    await newPost.save();

    return res.status(201).json({
      status: true,
      message: "Post added successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("Error in /api/posts/create:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while creating the post",
      error: error.message,
    });
  }
});

// UPDATE POST
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const postId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid Post ID",
      });
    }

    const updatedData = req.body;

    // Validate post existence
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: false,
        message: "Post not found",
      });
    }

    // Update post
    const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while updating the post",
      error: error.message,
    });
  }
});

// GET USER'S POSTS
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id })
      .populate("author", "name email")
      .populate("category", "_id name");

    if (!posts.length) {
      return res.status(404).json({
        status: false,
        message: "No posts found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Posts found successfully",
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching posts",
      error: error.message,
    });
  }
});

// GET SINGLE POST
router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid Post ID",
      });
    }

    const post = await Post.findById(postId)
      .populate("author", "name email")
      .populate("category", "_id name");

    if (!post) {
      return res.status(404).json({
        status: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Post found successfully",
      data: post,
    });
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching the post",
      error: error.message,
    });
  }
});

// DELETE POST
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid Post ID",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: false,
        message: "Post not found",
      });
    }

    // Check if the user is the author of the post
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        status: false,
        message: "Forbidden: You are not authorized to delete this post",
      });
    }

    await Post.findByIdAndDelete(postId);

    return res.status(200).json({
      status: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while deleting the post",
      error: error.message,
    });
  }
});

module.exports = router;
