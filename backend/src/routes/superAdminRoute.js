const express = require('express')
const verifyToken = require('../middlewares/authMiddleware')
const {authorizeSuperAdmin} = require('../middlewares/roleMiddleware')
const User = require('../models/userModel')

const router = express.Router()

// Assign role to a user
router.put('/assign-role', verifyToken, authorizeSuperAdmin, async (req, res) => {
    const { username, role } = req.body 
    if(!['user', 'admin','coach','superadmin'].includes(role)){
        return res.status(400).json({message : "Invalid Role"})
    }
    try{
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({message : "User not found"})
        }
        user.role = role
        await user.save()
        res.status(200).json({
            message : `Role of ${username} is updated to ${role}`
        })
    }catch(error){
        console.error(error)
        res.status(500).json({message : "Error Updating Role"})
    }
})


module.exports = router