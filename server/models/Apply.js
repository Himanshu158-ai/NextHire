const mongoose = require("mongoose");

const applySchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

module.exports = mongoose.model("Apply", applySchema);