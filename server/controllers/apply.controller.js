const Apply = require("../models/Apply");

const applyJob = async (req, res) => {
    try {
        const { jobId, userId } = req.body;
        const apply = new Apply({ job: jobId, user: userId });
        await apply.save();
        res.status(200).json({ success: true, message: "Job applied successfully", apply });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const findSubmissions = async (req, res) => {

    try {
        const { id } = req.params;
        const submissions = await Apply.find({ job: id }).populate("user", "name email skills education");
        res.status(200).json({ success: true, submissions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await Apply.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Submission deleted successfully", submission });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await Apply.findByIdAndUpdate(id, { status: "shortlisted" });
        res.status(200).json({ success: true, message: "Submission updated successfully", submission });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const findUserSubmissions = async (req, res) => {
    try {
        const { id } = req.user;
        const submissions = await Apply.findOne({
            $and: [
                { user: id },
                { job: req.params.jobId }
            ]
        }).populate("job", "title company location");

        if(submissions){
            res.status(200).json({ success: true, submissions });
        }else{
            res.status(200).json({ success: false, message: "No submissions found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { applyJob, findSubmissions, deleteSubmission, updateSubmission, findUserSubmissions };  