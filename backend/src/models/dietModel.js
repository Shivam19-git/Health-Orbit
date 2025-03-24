// src/models/DietData.js
const mongoose = require('mongoose')

const DietDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String, 
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  proteins: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
});

const DietData = mongoose.model("DietData", DietDataSchema);
module.exports =  DietData;