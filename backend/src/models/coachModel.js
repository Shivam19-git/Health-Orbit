const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'coach',
  },
  certificateURL: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  specialization: {
    type: String,
    default: "",
  },
  experience: {
    type: Number,
    default: 0,
  },
  bio: {
    type: String,
    default: "",
  },
  pendingRequests: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      userName: {
        type: String,
        required: true,
      },
      userEmail: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  workouts: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(), // Generate a new ObjectId
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        default: "",
      },
      videoId: {
        type: String,
        required: true, // YouTube video ID
      },
      category: {
        type: String,
        required: true, // e.g., "Strength", "Cardio"
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('Coach', coachSchema);