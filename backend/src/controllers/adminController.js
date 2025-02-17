const Coach = require('../models/coachModel')
const bcrypt = require('bcryptjs')
const Admin = require('../models/adminModel')
const jwt = require('jsonwebtoken')


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
        }, process.env.JWT_SECRET, {expiresIn : '1h'})

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

module.exports = {getPendingCoaches, approveCoach, rejectCoach , loginAdmin}