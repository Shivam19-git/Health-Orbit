const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
  let token
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1]
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // Attach decoded user to request object
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({ message: "Unauthorized" })
  }
}

module.exports = authMiddleware