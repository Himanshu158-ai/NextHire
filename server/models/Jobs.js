const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  company: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship", "Remote"],
    default: "Full-time"
  },

  salary: {
    type: String,
    default: "Not disclosed"
  },

  experienceRequired: {
    type: String,
    default: "Fresher"
  },

  skillsRequired: {
    type: [String],
    default: []
  },

  description: {
    type: String,
    required: true
  },

  lastDateToApply: {
    type: Date
  },

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
