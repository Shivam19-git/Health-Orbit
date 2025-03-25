const express = require('express')
const { 
    registerCoach,
    loginCoach, 
    logoutCoach, 
    updateCoachDetails,
    getCoachDetails,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkouts } = require('../controllers/coachController')

const upload = require('../config/multer')
const verifyToken = require('../middlewares/authMiddleware')
const authorizeRole = require('../middlewares/roleMiddleware')
const Coach = require('../models/coachModel')
const User = require('../models/userModel')

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
    try {        const coachId = req.user.id;

        const coach = await Coach.findById(coachId).select('pendingRequests');
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }

        // Filter only pending requests
        const pendingRequests = coach.pendingRequests.filter(
            (request) => request.status === 'pending'
        );

        res.status(200).json(pendingRequests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pending requests", error: error.message });
    }
});

router.get('/accepted-requests', async (req, res) => {
    try {
        const coachId = req.user.id;

        const coach = await Coach.findById(coachId).select('pendingRequests');
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }

        // Filter only accepted requests
        const acceptedRequests = coach.pendingRequests.filter(
            (request) => request.status === 'accepted'
        );

        res.status(200).json(acceptedRequests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching accepted requests", error: error.message });
    }
});

// Accept a user request
router.put('/accept-request/:userId', verifyToken, async (req, res) => {
    try {
      const coachId = req.user.id;
      const { userId } = req.params;
  
      const coach = await Coach.findById(coachId);
      if (!coach) {
        return res.status(404).json({ message: "Coach not found" });
      }
  
      const request = coach.pendingRequests.find(
        (req) => req.userId.toString() === userId && req.status === 'pending'
      );
      if (!request) {
        return res.status(404).json({ message: "Request not found or already processed" });
      }
  
      request.status = 'accepted';
      await coach.save();
  
      // Add the coach to the user's connectedCoaches list
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.connectedCoaches.push({ coachId });
      await user.save();
  
      res.status(200).json({ message: "Request accepted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error accepting request", error: error.message });
    }
  });
  
  // Reject a user request
  router.put('/reject-request/:userId', verifyToken, async (req, res) => {
    try {
      const coachId = req.user.id;
      const { userId } = req.params;
  
      const coach = await Coach.findById(coachId);
      if (!coach) {
        return res.status(404).json({ message: "Coach not found" });
      }
  
      const request = coach.pendingRequests.find(
        (req) => req.userId.toString() === userId && req.status === 'pending'
      );
      if (!request) {
        return res.status(404).json({ message: "Request not found or already processed" });
      }
  
      request.status = 'rejected';
      await coach.save();
  
      res.status(200).json({ message: "Request rejected successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error rejecting request", error: error.message });
    }
  });

// Add new workout routes
router.post('/:coachId/workouts', addWorkout); // Add a workout
router.put('/:coachId/workouts/:workoutId', updateWorkout); // Update a workout
router.delete('/:coachId/workouts/:workoutId', deleteWorkout); // Delete a workout
router.get('/:coachId/workouts', getWorkouts); // Fetch all workouts

module.exports = router