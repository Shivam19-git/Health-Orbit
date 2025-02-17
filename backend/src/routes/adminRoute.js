const express = require('express');
const { getPendingCoaches, approveCoach, rejectCoach } = require('../controllers/adminController');
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(verifyToken);
router.use(authorizeRole('admin'));

router.get('/pending-coaches', getPendingCoaches);
router.put('/approve-coach/:coachId', approveCoach);
router.delete('/reject-coach/:coachId', rejectCoach);

module.exports = router;