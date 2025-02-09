const express = require('express')
const verifyToken = require('../middlewares/authMiddleware')
const {authorizeRole} = require('../middlewares/roleMiddleware')
const router = express.Router()

// only admin can access
router.get('/admin', verifyToken, (req, res) => {
    res.send('Admin Page')
})

// both admin and manager can access 
router.get('/coach', verifyToken, (req, res) => {
    res.send('Coach Page')
})

// all can access this route
router.get('/user', verifyToken, (req, res) => {
    res.send('User Page')
})

module.exports = router