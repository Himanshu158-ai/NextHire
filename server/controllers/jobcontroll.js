const Job = require('../models/jobs')

// Recruiter creates a job
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      jobType,
      salary,
      experienceRequired,
      skillsRequired,
      description
    } = req.body;

    // Create job in DB
    const job = await Job.create({
      title,
      company,
      location,
      jobType,
      salary,
      experienceRequired,
      skillsRequired,
      description,
      postedBy: req.user.id // recruiter id from token
    });

    res.status(201).json({
      message: "Job posted successfully",
      job
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//jobb feed page (_first)
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: jobs.length,
      jobs
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//job by _id
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name email");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);

  } catch (error) {
    res.status(500).json({ message: "Invalid Job ID" });
  }
};

//job delete
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Invalid Job ID" });
  }
};  


//get my_job
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json({
      count: jobs.length,
      jobs
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};