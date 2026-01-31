import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditProfile = () => {
  // Dummy data (later API se aayega)
  const [user, setUser] = useState({
    name: "Himanshu Singh",
    email: "seeker@test.com",
    role: "seeker",
    skills: ["React", "Node.js"],
    education: "B.Tech Computer Science",
    experience: "Fresher",
    location: "Delhi"
  });

  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (!skillInput.trim()) return;
    setUser({ ...user, skills: [...user.skills, skillInput] });
    setSkillInput("");
  };

  const removeSkill = (index) => {
    setUser({
      ...user,
      skills: user.skills.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-16 py-4 border-b">
        <h1 className="text-xl md:text-2xl font-bold text-blue-600">
          Edit Profile
        </h1>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 sm:px-6 md:px-16 py-10">
        <div className="max-w-4xl mx-auto border rounded-lg p-6 md:p-8">

          {/* Name & Email (readonly) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <p className="mt-1 font-medium text-gray-900">
                {user.name}
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="mt-1 font-medium text-gray-900">
                {user.email}
              </p>
            </div>
          </div>

          <hr className="my-8" />

          {/* Editable Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Education */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Education
              </label>
              <input
                type="text"
                value={user.education}
                onChange={(e) =>
                  setUser({ ...user, education: e.target.value })
                }
                placeholder="e.g. B.Tech Computer Science"
                className="w-full border rounded-md px-4 py-2 mt-1 text-sm"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Experience
              </label>
              <input
                type="text"
                value={user.experience}
                onChange={(e) =>
                  setUser({ ...user, experience: e.target.value })
                }
                placeholder="e.g. Fresher / 1-2 years"
                className="w-full border rounded-md px-4 py-2 mt-1 text-sm"
              />
            </div>

            {/* Location */}
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={user.location}
                onChange={(e) =>
                  setUser({ ...user, location: e.target.value })
                }
                placeholder="e.g. Delhi / Remote"
                className="w-full border rounded-md px-4 py-2 mt-1 text-sm"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="mt-8">
            <label className="text-sm font-medium text-gray-700">
              Skills
            </label>

            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add a skill"
                className="flex-1 border rounded-md px-4 py-2 text-sm"
              />
              <button
                type="button"
                onClick={addSkill}
                className="bg-blue-600 text-white px-4 rounded-md text-sm hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-red-500 text-xs"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <Link to='/profile'>
          <button
            className="mt-10 w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
