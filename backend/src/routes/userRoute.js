const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(verifyToken);

// User-specific routes
router.get('/user', (req, res) => {
    res.send('User Page');
});

// Coach-specific routes
router.use(authorizeRole('coach', 'admin'));
router.get('/coach', (req, res) => {
    res.send('Coach Page');
});

// Admin-specific routes
router.use(authorizeRole('admin'));
router.get('/admin', (req, res) => {
    res.send('Admin Page');
});

module.exports = router;