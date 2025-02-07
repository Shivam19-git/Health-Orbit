const express = require('express')
const verifyToken = require('../middlewares/authMiddleware')
const authorizeRole = require('../middlewares/roleMiddleware')

const router = express.Router()

// only admin can access
router.get('/admin', verifyToken,authorizeRole("admin"),(req, res) => {
    res.send('Admin Page')
})

// both admin and manager can access 
router.get('/coach', verifyToken,authorizeRole("admin","coach"),(req, res) => {
    res.send('Coach Page')
})

// all can access this route
router.get('/user', verifyToken,authorizeRole("admin","coach","user"),(req, res) => {
    res.send('User Page')
})

module.exports = router