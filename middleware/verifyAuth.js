const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          // Use res.status(403) instead of res.sendStatus(403) to attach a JSON message
          return res.status(403).json({ message: "Token is invalid or expired" });
        }

        req.user = user;
        next();
      });
    } else {
      // Use res.status(401) for consistency with above
      res.status(401).json({ message: "Authentication token is required" });
    }
  } catch (error) {
    // Catch any other errors (e.g., JWT_SECRET missing)
    console.error("Error in token verification:", error);
    res.status(500).json({ message: "Server error during authentication" });
  }
};

module.exports = verifyAuth;
