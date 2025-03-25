const Coach = require('../models/coachModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerCoach = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Certificate file is required" });
        }

        const existingCoach = await Coach.findOne({ email });
        if (existingCoach) {
            return res.status(400).json({ message: "Coach already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Save coach (not approved yet)
        const newCoach = new Coach({
            name,
            email,
            password: hashedPassword,
            certificateURL: req.file.path,
            isApproved: false,
        });
        await newCoach.save(); // Save to database with pending approval
        res.status(201).json({ message: "Coach registration requested. Waiting for admin approval." });
    } catch (error) {
        res.status(500).json({ message: "Error in coach registration", error: error.message });
    }
};

const loginCoach = async (req, res) => {
    try {
        const { email, password } = req.body;
        const coach = await Coach.findOne({ email });

        if (!coach) {
            return res.status(400).json({ message: "Coach not found" });
        }
        if (!coach.isApproved) {
            return res.status(400).json({ message: "Coach not approved yet" });
        }

        // Password check
        const isMatch = await bcrypt.compare(password, coach.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                id: coach._id,
                role: "coach",
                email: coach.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, { httpOnly: true }).json({
            message: "Coach logged in successfully",
            token: token,
            coach: { id: coach._id, name: coach.name },
        });
    } catch (error) {
        res.status(500).json({ message: "Error in coach login", error: error.message });
    }
};

const logoutCoach = (req, res) => {
    try {
        if (!req.cookies.token) {
            return res.status(400).json({ message: "No token found" });
        }
        res.clearCookie('token').status(200).json({ message: "Coach logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error in coach logout", error: error.message });
    }
};

const updateCoachDetails = async (req, res) => {
    try {
        const { specialization, experience, bio } = req.body;
        const coachId = req.user.id;

        const coach = await Coach.findById(coachId);
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }

        // Update fields
        if (specialization) coach.specialization = specialization;
        if (experience) coach.experience = experience;
        if (bio) coach.bio = bio;

        await coach.save();

        res.status(200).json({ message: "Coach details updated successfully", coach });
    } catch (error) {
        res.status(500).json({ message: "Error updating coach details", error: error.message });
    }
};

const getCoachDetails = async (req, res) => {
    try {
        const coachId = req.user.id;
        const coach = await Coach.findById(coachId).select('-password'); // Exclude password
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }
        res.status(200).json(coach);
    } catch (error) {
        res.status(500).json({ message: "Error fetching coach details", error: error.message });
    }
};

// Add a new workout
const addWorkout = async (req, res) => {
    const { coachId } = req.params;
    const { name, description, videoId, category } = req.body;

    try {
        const coach = await Coach.findById(coachId);
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }

        const newWorkout = { name, description, videoId, category };
        coach.workouts.push(newWorkout);
        await coach.save();

        res.status(201).json({ message: "Workout added successfully", workouts: coach.workouts });
    } catch (error) {
        res.status(500).json({ message: "Error adding workout", error: error.message });
    }
};

// Update an existing workout
const updateWorkout = async (req, res) => {
    const { coachId, workoutId } = req.params;
    const { name, description, videoId, category } = req.body;

    try {
        const coach = await Coach.findById(coachId);
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }

        const workout = coach.workouts.id(workoutId);
        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        // Update workout fields
        workout.name = name || workout.name;
        workout.description = description || workout.description;
        workout.videoId = videoId || workout.videoId;
        workout.category = category || workout.category;

        await coach.save();

        res.status(200).json({ message: "Workout updated successfully", workouts: coach.workouts });
    } catch (error) {
        res.status(500).json({ message: "Error updating workout", error: error.message });
    }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { coachId, workoutId } = req.params;

    try {
        // Find the coach by ID
        const coach = await Coach.findById(coachId);
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }

        // Use Mongoose's $pull operator to remove the workout by its _id
        coach.workouts = coach.workouts.filter((workout) => workout._id.toString() !== workoutId);

        // Save the updated coach document
        await coach.save();

        res.status(200).json({ message: "Workout deleted successfully", workouts: coach.workouts });
    } catch (error) {
        console.error("Error deleting workout:", error);
        res.status(500).json({ message: "Error deleting workout", error: error.message });
    }
};

// Fetch all workouts for a coach
const getWorkouts = async (req, res) => {
    const { coachId } = req.params;

    try {
        const coach = await Coach.findById(coachId);
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }

        res.status(200).json({ workouts: coach.workouts });
    } catch (error) {
        res.status(500).json({ message: "Error fetching workouts", error: error.message });
    }
};

const getDietPlans = async (req, res) => {
    const { coachId } = req.params;

    try {
        const coach = await Coach.findById(coachId);
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }

        res.status(200).json({ dietPlans: coach.dietPlans });
    } catch (error) {
        res.status(500).json({ message: "Error fetching diet plans", error: error.message });
    }
};

const addDietPlan = async (req, res) => {
    const { coachId } = req.params;
    const { name, description, meals } = req.body;

    try {
        const coach = await Coach.findById(coachId);
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }

        const newDietPlan = { name, description, meals };
        coach.dietPlans.push(newDietPlan);
        await coach.save();

        res.status(201).json({ message: "Diet plan added successfully", dietPlans: coach.dietPlans });
    } catch (error) {
        res.status(500).json({ message: "Error adding diet plan", error: error.message });
    }
};

const updateDietPlan = async (req, res) => {
    const { coachId, dietPlanId } = req.params;
    const { name, description, meals } = req.body;

    try {
        const coach = await Coach.findById(coachId);
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }

        const dietPlan = coach.dietPlans.id(dietPlanId);
        if (!dietPlan) {
            return res.status(404).json({ message: "Diet plan not found" });
        }

        dietPlan.name = name || dietPlan.name;
        dietPlan.description = description || dietPlan.description;
        dietPlan.meals = meals || dietPlan.meals;

        await coach.save();

        res.status(200).json({ message: "Diet plan updated successfully", dietPlans: coach.dietPlans });
    } catch (error) {
        res.status(500).json({ message: "Error updating diet plan", error: error.message });
    }
};

const deleteDietPlan = async (req, res) => {
    const { coachId, dietPlanId } = req.params;

    try {
        const coach = await Coach.findById(coachId);
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }

        coach.dietPlans = coach.dietPlans.filter((plan) => plan._id.toString() !== dietPlanId);
        await coach.save();

        res.status(200).json({ message: "Diet plan deleted successfully", dietPlans: coach.dietPlans });
    } catch (error) {
        res.status(500).json({ message: "Error deleting diet plan", error: error.message });
    }
};

module.exports = {
    registerCoach,
    loginCoach,
    logoutCoach,
    updateCoachDetails,
    getCoachDetails,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkouts,
    getDietPlans,
    addDietPlan,
    updateDietPlan,
    deleteDietPlan,
};
