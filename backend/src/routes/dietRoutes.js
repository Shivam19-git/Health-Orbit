const express = require("express");
const DietData = require("../models/dietModel");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { date, category, item, calories, proteins, carbs } = req.body;
  const userId = req.user.id;
  const userFullName = req.user.fullname

  try {
    const newDietData = new DietData({
      userId,
      date,
      category,
      item,
      calories,
      proteins,
      carbs,
    });
    await newDietData.save();
    res.status(201).json({
      message: "Diet data added successfully",
      dietData: newDietData,
      fullname: userFullName, 
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving diet data", error });
  }
});

router.get("/:date", authMiddleware, async (req, res) => {
  const { date } = req.params;
  const userId = req.user.id;
  const userFullName = req.user.fullname

  try {
    const dietData = await DietData.find({ userId, date });
   // console.log("Fetching diet data for user:", userId, "and date:", date);
    res.status(200).json({dietData:dietData, fullname:userFullName});
  } catch (error) {
    res.status(500).json({ message: "Error in fetching Diet Data ", error });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const deletedData = await DietData.findOneAndDelete({ _id: id, userId });
    if (!deletedData) {
      return res.status(404).json({ message: "Diet data not found" });
    }
    res.status(200).json({ message: "Diet data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting diet data", error });
  }
});


module.exports = router