const express = require("express");
const { createJob, getAllJobs, getMyJobs, getJobById, deleteJob  } = require("../controllers/jobcontroll");
const recruiterOnly = require("../middlewares/recruiter.middleware");
const router = express.Router();

router.post("/", recruiterOnly ,createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/:id", getMyJobs);
router.delete("/:id", deleteJob);

module.exports = router;