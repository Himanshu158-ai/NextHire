const express = require("express");
const router = express.Router();
const { applyJob, findSubmissions, deleteSubmission, updateSubmission } = require("../controllers/apply.controller");
const seekerOnly = require("../middlewares/seeker.middleware");

router.post("/",seekerOnly, applyJob);
router.get('/:id', findSubmissions)
router.delete('/:id',deleteSubmission)
router.put('/:id',updateSubmission)
module.exports = router;    