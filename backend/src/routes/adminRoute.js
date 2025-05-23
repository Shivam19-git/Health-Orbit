const express = require('express');
const {
  getPendingCoaches,
  approveCoach,
  rejectCoach,
  loginAdmin,
  getApprovedCoaches,
  getAllUsers,
  deactivateCoach,
  deactivateUser,
} = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/login', loginAdmin);

// Get all pending coaches (requires admin role)
router.get('/pending-coaches', authMiddleware, roleMiddleware('admin'), getPendingCoaches);

// Approve a coach (requires admin role)
router.put('/approve-coach/:coachId', authMiddleware, roleMiddleware('admin'), approveCoach);

// Reject a coach (requires admin role)
router.delete('/reject-coach/:coachId', authMiddleware, roleMiddleware('admin'), rejectCoach);

// Fetch all approved coaches (requires admin role)
router.get('/approved-coaches', authMiddleware, roleMiddleware('admin'), getApprovedCoaches);

// Fetch all users (requires admin role)
router.get('/users', authMiddleware, roleMiddleware('admin'), getAllUsers);

// Deactivate a coach (requires admin role)
router.put('/deactivate-coach/:coachId', authMiddleware, roleMiddleware('admin'), deactivateCoach);

// Deactivate a user (requires admin role)
router.put('/deactivate-user/:userId', authMiddleware, roleMiddleware('admin'), deactivateUser);

module.exports = router;