const bcrypt = require('bcryptjs') // for hashing password 
const jwt = require('jsonwebtoken') // for generating token for successful login
const User = require('../models/userModel')

const register = async (req,res)=>{
    try {
      
        const {username ,password , role} = req.body
        const hashPassword = await brcypt.hash(password, 10)    
    
        const newUser = new User({
            username,
            password : hashPassword,
            role
        })
        await newUser.save()
        res.status(201).json({message : `User registered successfully : ${newUser.username}`})
    
    } catch (error) {
        res.json("Error in user registration", error).status(500)
        console.log("Error in user registration", error)
    }
    
}

const login = async (req,res)=>{
    try {
        
        const {username ,password } = req.body
        const user = await User.findOne({username})

        if(!user){
            return res.status(400).json({message : "User not found"})
        }
        const isMatch = await bcrypt.compare(password,user.password )
        if(!isMatch){
            return res.status(400).json({message : "Invalid credentials"})
        }

        const token = jwt.sign({
            id : user._id,
            role : user.role
        }, process.env.JWT_SECRET, {expiresIn : '1h'})

        res.status(200).json({token})

    } catch (error) {
        
    }

}

module.exports = {  register, login }