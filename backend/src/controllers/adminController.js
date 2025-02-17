const Coach = require('../models/coachModel')

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

module.exports = {getPendingCoaches, approveCoach, rejectCoach}