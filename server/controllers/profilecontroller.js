const User = require("../models/User");

exports.loginProfile = async(req,res) =>{
    try {
        let { _id } = req.body;

        const user = await User.findOne({ _id });
        res.status(201).json({
            message: "successfully finded",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.editProfile = async (req, res) => {
  try {
    const { user } = req.body;

    if (!user || !user._id) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const current_user = await User.findById(user._id);

    if (!current_user) {
      return res.status(404).json({ message: "User not exist" });
    }

    // ✅ Update fields (safe way)
    current_user.location = user.location || current_user.location;
    current_user.education = user.education || current_user.education;
    current_user.experience = user.experience || current_user.experience;
    current_user.skills = user.skills || current_user.skills;

    await current_user.save();

    return res.status(200).json({
      success: true,
      message: "updated successfully",
      user: current_user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
