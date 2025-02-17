const express = require('express')
const { registerCoach, loginCoach, logoutCoach } = require('../controllers/coachController')
const upload = require('../config/multer')
const verifyToken = require('../middlewares/authMiddleware')
const authorizeRole = require('../middlewares/roleMiddleware')

const router = express.Router()

router.post('/register', upload.single('certificate'), registerCoach)

router.post('/login', loginCoach)
router.post('/logout', logoutCoach)

router.use(verifyToken)
router.use(authorizeRole('coach'))

// Add coach-specific routes here

module.exports = router