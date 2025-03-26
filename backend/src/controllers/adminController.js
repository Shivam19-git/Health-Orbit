const Coach = require('../models/coachModel')
const bcrypt = require('bcryptjs')
const Admin = require('../models/adminModel')
const jwt = require('jsonwebtoken')
const User = require("../models/userModel");

const loginAdmin = async (req, res) => {
    try {
        
        const {username, password} = req.body

        const admin = await Admin.findOne({username})
        if(!admin){
            return res.status(400).json({message : "Admin not found"})
        }
        
        const isMatch = await bcrypt.compare(password, admin.password)
        if(!isMatch){
            return res.status(400).json({message : "Invalid credentials"})
        }

        //Generate token for admin
        const token = jwt.sign({
            id : admin._id,
            role : "admin",
            username : admin.username
        }, process.env.JWT_SECRET, {expiresIn : '7d'})

        res.status(200).json({ message: "Logged in successfully", token })

    } catch (error) {
        res.status(500).json({ message: "Error in admin login", error: error.message })
    }
}

const getPendingCoaches = async (req, res) => {
    try{

        const pendingCoaches = await Coach.find({isApproved : false})
        res.json(pendingCoaches)


    }catch(error){
        res.status(500).json({ message: "Error in fetching pending coaches", error: error.message })
    }
}

const approveCoach = async (req, res) => {
    try {
        
        const {coachId} = req.params
        const coach = await Coach.findById(coachId)

        if(!coach){
            return res.status(404).json({message : "Coach not found"})
        }
        coach.isApproved = true
        await coach.save()

        res.json({message : "Coach approved successfully"})

    } catch (error) {
        res.status(500).json({ message: "Error in approving coach", error: error.message })
    }
}

const rejectCoach = async (req, res) => {
    try {
        const { coachId } = req.params
        const coach = await Coach.findByIdAndDelete(coachId)
    
        if (!coach) return res.status(404).json({ message: "Coach not found" })
    
        res.json({ message: "Coach rejected and removed successfully" })
      } catch (error) {
        res.status(500).json({ message: "Error rejecting coach", error })
      }
}

// Fetch all approved coaches
const getApprovedCoaches = async (req, res) => {
    try {
      const approvedCoaches = await Coach.find({ isApproved: true }).select(
        "name email specialization experience bio"
      );
  
      res.status(200).json(approvedCoaches);
    } catch (error) {
      console.error("Error fetching approved coaches:", error);
      res.status(500).json({ message: "Error fetching approved coaches" });
    }
  };

// Fetch all users
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find()
        .select("fullname email role connectedCoaches")
        .populate({
          path: "connectedCoaches.coachId",
          select: "name email specialization experience bio",
        });
  
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Error fetching users", error: error.message });
    }
  };

// Deactivate a coach
const deactivateCoach = async (req, res) => {
  try {
    const { coachId } = req.params;

    const coach = await Coach.findById(coachId);
    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    coach.isApproved = false; // Set isApproved to false
    await coach.save();

    res.status(200).json({ message: "Coach deactivated successfully" });
  } catch (error) {
    console.error("Error deactivating coach:", error);
    res.status(500).json({ message: "Error deactivating coach", error: error.message });
  }
};

// Deactivate a user
const deactivateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = false; // Set isActive to false (assuming you have an `isActive` field)
    await user.save();

    res.status(200).json({ message: "User deactivated successfully" });
  } catch (error) {
    console.error("Error deactivating user:", error);
    res.status(500).json({ message: "Error deactivating user", error: error.message });
  }
};

module.exports = {
  getPendingCoaches,
  approveCoach,
  rejectCoach,
  loginAdmin,
  getApprovedCoaches,
  getAllUsers,
  deactivateCoach,
  deactivateUser,
};