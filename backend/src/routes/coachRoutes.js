const express = require('express')
const { 
    registerCoach,
    loginCoach, 
    logoutCoach, 
    updateCoachDetails,
    getCoachDetails } = require('../controllers/coachController')

const upload = require('../config/multer')
const verifyToken = require('../middlewares/authMiddleware')
const authorizeRole = require('../middlewares/roleMiddleware')
const Coach = require('../models/coachModel')

const router = express.Router()

router.post('/register', upload.single('certificate'), registerCoach)

router.post('/login', loginCoach)
router.post('/logout', logoutCoach)

router.use(verifyToken)
router.use(authorizeRole('coach'))

// Add coach-specific routes here 
router.get('/details',getCoachDetails);
router.put('/update-details', updateCoachDetails);

router.get('/pending-requests', async (req, res) => {
    try {
        const coachId = req.user.id;

        const coach = await Coach.findById(coachId).select('pendingRequests');
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }

        res.status(200).json(coach.pendingRequests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pending requests", error: error.message });
    }
});

module.exports = router