const User = require("../models/userModel");

const fetchUserDetailsMiddleware = async (req, res, next) => {
  try {
    // Ensure `req.user` exists (set by authMiddleware)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    // Fetch user details from the database
    const user = await User.findById(req.user.id).select("fullname email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach additional user details to req.user
    req.user.fullname = user.fullname; // Attach fullname
    req.user.email = user.email; // Attach email

    next();
  } catch (error) {
    console.error("Error in fetchUserDetailsMiddleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = fetchUserDetailsMiddleware;