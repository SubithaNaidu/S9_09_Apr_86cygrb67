const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Format: Bearer <token>

  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT); // Use your secret
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Invalid token.",
    });
  }
};

module.exports = verifyToken;
