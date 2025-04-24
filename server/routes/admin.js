const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");
const Post = require("../models/Post");
const Category = require("../models/Category")
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({
        name:-1
    }); 
    res.status(200).json({
      status: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

router.get("/posts",async (req,res)=>{
    try {
        const posts = await Post.find().populate(
            "author",
            "-password"  
        )
        res.status(200).json({
            status: true,
            message: "Posts fetched successfully",
            posts
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
          });
    }
})

router.get("/users-with-posts", async (req, res) => {
    try {
      const users = await User.find({}).select("-password");
  
      const usersWithPosts = await Promise.all(
        users.map(async (user) => {
          const posts = await Post.find({ author: user._id }).populate("category", "name");
          return {
            ...user.toObject(),
            posts,
          };
        })
      );
  
      res.status(200).json({
        status: true,
        message: "Users with posts fetched successfully",
        data: usersWithPosts,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  });

router.post("/update-status/:id",async (req,res)=>{
    try {
        const id = req.params.id;
        const post = await Post.findByIdAndUpdate(id, { status:"published" }, { new: true });
        res.status(200).json({
            status: true,
            message: "Post published",
            post
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
          });
    }
})

router.get('/categories', async (req, res) => {
    try {
      const categories = await Category.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, categories });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch categories', error: error.message });
    }
  });
  
  router.put("/access/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id); 
  
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
          data: [],
        });
      }
  
      user.role = user.role === "admin" ? "user" : "admin";
      await user.save();
  
      res.status(200).json({
        status: true,
        message: "Role updated",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  });
  
router.post("/publish/:id",async (req,res)=>{
  try {
    const {id}=req.params.id
    const post=await Post.findById(id)
    if(!post){
      return res.status(404).json({
        status:false,
        message:"Post not found",
        data:[],
        })
    }
    post.status="published"
    await post.save()
    res.status(200).json({
      status:true,
      message:"Post published",
      data:post
    })
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    })
  }
})

router.post("/diable/:id",async (req,res)=>{
  try {
    const {id} = req.params
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({
        status: false,
        message: "Post not found",
        data: [],
        })
      }
  } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      })
  }
})
module.exports = router;
