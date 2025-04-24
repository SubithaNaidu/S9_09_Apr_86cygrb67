const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...otherData } = user._doc;
    res.status(200).json(otherData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
