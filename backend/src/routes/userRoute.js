const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const Coach = require('../models/coachModel');
const fetchUserDetailsMiddleware = require("../middlewares/fetchUserDetailsMiddleware");
const User = require('../models/userModel');

const router = express.Router();

// Fetch all approved coaches
router.get('/all-coaches', verifyToken,async (req, res) => {
    try {
        const coaches = await Coach.find({ isApproved: true }).select("-password");
        res.status(200).json(coaches);
    } catch (error) {
        res.status(500).json({ message: "Error fetching coaches", error: error.message });
    }
});

router.get('/connected-coaches', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('connectedCoaches');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out duplicate coachId entries
    const uniqueConnectedCoaches = user.connectedCoaches.filter(
      (connectedCoach, index, self) =>
        index === self.findIndex((c) => c.coachId.toString() === connectedCoach.coachId.toString())
    );

    // Populate coach details for each unique connected coach
    const connectedCoaches = await Promise.all(
      uniqueConnectedCoaches.map(async (connectedCoach) => {
        const coach = await Coach.findById(connectedCoach.coachId).select('name email specialization experience bio');
        return {
          ...connectedCoach.toObject(),
          coachName: coach?.name || "Unknown",
          coachEmail: coach?.email || "Unknown",
          specialization: coach?.specialization || "N/A",
          experience: coach?.experience || "N/A",
          bio: coach?.bio || "N/A",
        };
      })
    );

    res.status(200).json(connectedCoaches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching connected coaches", error: error.message });
  }
});

router.get("/coach/:coachId", verifyToken, async (req, res) => {
  const { coachId } = req.params;

  try {
    // Fetch the coach details from the database
    const coach = await Coach.findById(coachId).select(
      "name email specialization experience bio workouts dietPlans"
    );

    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    // Return the coach details
    res.status(200).json({
      name: coach.name,
      email: coach.email,
      specialization: coach.specialization,
      experience: coach.experience,
      bio: coach.bio,
      workouts: coach.workouts,
      dietPlans: coach.dietPlans,
    });
  } catch (error) {
    console.error("Error fetching coach details:", error);
    res.status(500).json({ message: "Error fetching coach details" });
  }
});

router.post('/join-coach/:coachId', verifyToken, fetchUserDetailsMiddleware, async (req, res) => {
    try {
        const { coachId } = req.params;
        const userId = req.user.id;
        const userName = req.user.fullname;
        const userEmail = req.user.email;

        const coach = await Coach.findById(coachId);
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }

        // Check if the request already exists
        const existingRequest = coach.pendingRequests.find(
            (request) => request.userId.toString() === userId
        );
        if (existingRequest) {
            return res.status(400).json({ message: "Request already sent to this coach" });
        }

        // Add the request to the coach's pendingRequests
        coach.pendingRequests.push({ userId, userName, userEmail });
        await coach.save();

        res.status(200).json({ message: "Join request sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error sending join request", error: error.message });
    }
});

// New route to fetch coaches that the user has requested but not yet connected with
router.get('/requested-coaches', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all coaches that have a pending request from this user
    const coaches = await Coach.find({
      'pendingRequests.userId': mongoose.Types.ObjectId(userId) || userId
    }).select('_id name email specialization experience bio');

    // Format the response to match the format expected by the frontend
    const requestedCoaches = coaches.map(coach => ({
      coachId: coach._id,
      coachName: coach.name,
      coachEmail: coach.email,
      specialization: coach.specialization || "N/A",
      experience: coach.experience || "N/A",
      bio: coach.bio || "N/A",
    }));

    res.status(200).json(requestedCoaches);
  } catch (error) {
    console.error("Error fetching requested coaches:", error);
    res.status(500).json({ 
      message: "Error fetching requested coaches", 
      error: error.message 
    });
  }
});

module.exports = router;