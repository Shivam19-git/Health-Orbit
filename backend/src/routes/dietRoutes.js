const express = require("express");
const DietData = require("../models/dietModel");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Add diet data
router.post("/", authMiddleware, async (req, res) => {
  const { date, category, item, calories, proteins, carbs } = req.body;
  const userId = req.user.id;
  const fullName = req.user.fullname;
 
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
      fullName,
    });
  } catch (error) {
    console.error("Error saving diet data:", error); // Log the error
    res.status(500).json({ message: "Error saving diet data", error });
  }
});

// Fetch diet data for a specific date
router.get("/:date", authMiddleware, async (req, res) => {
  const { date } = req.params;
  const userId = req.user.id;

  try {
    const dietData = await DietData.find({ userId, date });
    res.status(200).json(dietData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching diet data", error });
  }
});

// Update the "eaten" status of a diet item
router.patch("/:id/eaten", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { eaten } = req.body;
  const userId = req.user.id;

  try {
    const updatedDietData = await DietData.findOneAndUpdate(
      { _id: id, userId },
      { eaten },
      { new: true }
    );

    if (!updatedDietData) {
      return res.status(404).json({ message: "Diet data not found" });
    }

    res.status(200).json(updatedDietData);
  } catch (error) {
    res.status(500).json({ message: "Error updating diet data", error });
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

module.exports = router;