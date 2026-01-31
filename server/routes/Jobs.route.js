const express = require("express");
const { createJob, getAllJobs, getJobById } = require("../controllers/jobcontroll");
const protect = require("../middlewares/Auth.middleware");
const recruiterOnly = require("../middlewares/recruiter.middleware");
const router = express.Router();

router.post("/",protect, recruiterOnly ,createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);

module.exports = router;