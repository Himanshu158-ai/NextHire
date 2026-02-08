import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify"
import { API_URL } from "../config/api";

const EditProfile = () => {
  const _id = localStorage.getItem("userID");

  const [user, setUser] = useState({
    name: "",
    email: "",
    education: "",
    experience: "",
    location: "",
    skills: [],
  });

  async function change() {
    try {
      const res = await axios.patch(`${API_URL}/api/profile/edit`, { user });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.message);
    }
  }

  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.post(`${API_URL}/api/profile`, { _id });

        setUser({
          ...res.data.user,
          skills: res.data.user.skills || [],
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    getUser();
  }, [_id]);


  const addSkill = () => {
    if (!skillInput.trim()) return;

    setUser(prev => ({
      ...prev,
      skills: [...prev.skills, skillInput.trim()],
    }));

    setSkillInput("");
  };


  const removeSkill = (index) => {
    setUser(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-16 py-4 border-b">
        <h1 className="text-xl md:text-2xl font-bold text-blue-600">
          Edit Profile
        </h1>
      </header>

      <main className="flex-1 px-4 sm:px-6 md:px-16 py-10">
        <div className="max-w-4xl mx-auto border rounded-lg p-6 md:p-8">

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <p className="mt-1 font-medium">{user.name}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="mt-1 font-medium">{user.email}</p>
            </div>
          </div>

          <hr className="my-8" />

          {/* Editable Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Education</label>
              <input
                value={user.education}
                placeholder="e.g. B.Tech Computer Science"
                onChange={(e) =>
                  setUser({ ...user, education: e.target.value })
                }
                className="w-full border rounded-md px-4 py-2 mt-1 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Experience</label>
              <input
                value={user.experience}
                placeholder="e.g. Fresher / 1-2 years"
                onChange={(e) =>
                  setUser({ ...user, experience: e.target.value })
                }
                className="w-full border rounded-md px-4 py-2 mt-1 text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Location</label>
              <input
                value={user.location}
                placeholder="e.g. Delhi / Remote"
                onChange={(e) =>
                  setUser({ ...user, location: e.target.value })
                }
                className="w-full border rounded-md px-4 py-2 mt-1 text-sm"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="mt-8">
            <label className="text-sm font-medium">Skills</label>

            <div className="flex gap-2 mt-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="flex-1 border rounded-md px-4 py-2 text-sm"
                placeholder="Add skill"
              />
              <button
                onClick={addSkill}
                className="bg-blue-600 text-white px-4 rounded-md"
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

          <Link to="/profile">
          <button className="mt-10 w-full bg-blue-600 text-white py-3 rounded-md" onClick={change}>
            Save Changes
          </button>
          </Link>

        </div>
      </main>
    </div>
  );
};

export default EditProfile;
