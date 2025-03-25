const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const Coach = require('../models/coachModel');
const fetchUserDetailsMiddleware = require("../middlewares/fetchUserDetailsMiddleware");

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

module.exports = router;