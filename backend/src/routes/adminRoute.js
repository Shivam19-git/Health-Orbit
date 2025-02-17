const express = require('express')
const { getPendingCoaches, approveCoach, rejectCoach, loginAdmin } = require('../controllers/adminController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')


const router = express.Router()

router.post('/login', loginAdmin)

// Get all pending coaches (requires admin role)
router.get('/pending-coaches', authMiddleware, roleMiddleware('admin'), getPendingCoaches)

// Approve a coach (requires admin role)
router.put('/approve-coach/:coachId', authMiddleware, roleMiddleware('admin'), approveCoach)

// Reject a coach (requires admin role)
router.delete('/reject-coach/:coachId', authMiddleware, roleMiddleware('admin'), rejectCoach)

module.exports = router