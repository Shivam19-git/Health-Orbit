const Coach = require('../models/coachModel')   
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerCoach = async (req, res) => {
    try {
        const {name, email, password } = req.body
        
        if (!req.file) {
            return res.status(400).json({ message: "Certificate file is required" })
        }

        const existingCoach = await Coach.findOne({email})
        if(existingCoach){
            return res.status(400).json({message : "Coach already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        //SAVE COACH not Approved yet
        const newCoach = new Coach({
            name,
            email,
            password : hashedPassword,
            certificateURL : req.file.path,
            isApproved : false
        })
        await newCoach.save() // save to database with pending approval
        res.status(201).json({ message: "Coach registration requested. Waiting for admin approval." })


    } catch (error) {
        res.status(500).json({ message: "Error in coach registration", error: error.message })
    }
}

const loginCoach = async (req, res) => {
    try {
        
        const {email, password} = req.body
        const coach = await Coach.findOne({email})

        if(!coach){
            return res.status(400).json({message : "Coach not found"})
        }   
        if(!coach.isApproved){
            return res.status(400).json({message : "Coach not approved yet"})
        }

        // Password check
        const isMatch = await bcrypt.compare(password, coach.password)
        
        if(!isMatch){
            return res.status(400).json({message : "Invalid credentials"})
        }

        const token = jwt.sign({
            id : coach._id,
            role : "coach",
            email : coach.email
        },process.env.JWT_SECRET, {expiresIn : '1h'})

        res.cookie('token', token, {httpOnly : true}).json({message : "Coach logged in successfully", token : token})

    } catch (error) {
        res.status(500).json({ message: "Error in coach login", error: error.message })
    }
}

const logoutCoach = (req, res) => {
    try {
        if (!req.cookies.token) {
            return res.status(400).json({ message: "No token found" })
        }
        res.clearCookie('token').status(200).json({ message: "Coach logged out successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error in coach logout", error: error.message })
    }
}

module.exports = {registerCoach, loginCoach, logoutCoach}
