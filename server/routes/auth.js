const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/register",async (req,res)=>{
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                status:false,
                message:"Please fill in all fields"
            })
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                status:false,
                message:"Email already exists"
                })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            name,
            email,
            password:hashedPassword
            })
        await newUser.save()
        res.status(201).json({
            status:true,
            message:"User created successfully",
            data:newUser
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            message:error.message
        })
    }
})


router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          status: false,
          message: "Please fill in all fields",
        });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "Email does not exist",
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          status: false,
          message: "Incorrect password",
        });
      }
  
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT,
        { expiresIn: "1d" }
      );
  
      const { password:_, ...otherUser } = user._doc;
  
      res.status(200).json({
        status: true,
        message: "Logged in successfully",
        data: {
          token:token,
          user: otherUser,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  });
  

module.exports = router