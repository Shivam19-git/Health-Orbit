const express = require('express')
const verifyToken = require('../middlewares/authMiddleware')

const router = express.Router()

// only admin can access
router.get('/admin', verifyToken ,(req, res) => {
    res.send('Admin Page')
})

// both admin and manager can access 
router.get('/manager', (req, res) => {
    res.send('Manager Page')
})

// all can access this route
router.get('/user', (req, res) => {
    res.send('User Page')
})

module.exports = router