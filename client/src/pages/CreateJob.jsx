import React, { useState } from "react";
// import {axios} from "axios"
import axios from "axios"
import { API_URL } from "../config/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const CreateJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-time",
    salary: "",
    experienceRequired: "",
    skillsRequired: [],
    description: ""
  });

  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (!skillInput.trim()) return;

    setJobData({
      ...jobData,
      skillsRequired: [...jobData.skillsRequired, skillInput]
    });

    setSkillInput("");
  };

  const removeSkill = (index) => {
    setJobData({
      ...jobData,
      skillsRequired: jobData.skillsRequired.filter((_, i) => i !== index)
    });
  };

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Later axios call here
    try {
      const res = await axios.post(`${API_URL}/api/jobs`, jobData, {
        withCredentials: true,
      })
      
      toast.success("Job created successfully");
      navigate("/jobs");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-16 py-4 border-b">
        <h1 className="text-xl md:text-2xl font-bold text-blue-600">
          Post a Job
        </h1>
      </header>

      {/* Form */}
      <main className="flex-1 px-4 sm:px-6 md:px-16 py-10">
        <div className="max-w-4xl mx-auto border rounded-lg p-6 md:p-8">

          <h2 className="text-2xl font-bold text-gray-900">
            Create New Job
          </h2>
          <p className="text-gray-600 mt-2">
            Fill the details below to post a new job.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                className="w-full border rounded-md px-4 py-2 text-sm"
                required
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={jobData.company}
                onChange={handleChange}
                placeholder="e.g. Google"
                className="w-full border rounded-md px-4 py-2 text-sm"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                placeholder="e.g. Delhi / Remote"
                className="w-full border rounded-md px-4 py-2 text-sm"
                required
              />
            </div>

            {/* Job Type + Salary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <select
                  name="jobType"
                  value={jobData.jobType}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 text-sm"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary
                </label>
                <input
                  type="text"
                  name="salary"
                  value={jobData.salary}
                  onChange={handleChange}
                  placeholder="e.g. 6-10 LPA"
                  className="w-full border rounded-md px-4 py-2 text-sm"
                />
              </div>
            </div>

            {/* Experience + Last Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Required
                </label>
                <input
                  type="text"
                  name="experienceRequired"
                  value={jobData.experienceRequired}
                  onChange={handleChange}
                  placeholder="e.g. 0-2 years"
                  className="w-full border rounded-md px-4 py-2 text-sm"
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills Required
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="e.g. React"
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
                {jobData.skillsRequired.length === 0 ? (
                  <span className="text-sm text-gray-400">
                    No skills added
                  </span>
                ) : (
                  jobData.skillsRequired.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-red-500 text-xs"
                      >
                        ✕
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                name="description"
                value={jobData.description}
                onChange={handleChange}
                placeholder="Write job details here..."
                rows="5"
                className="w-full border rounded-md px-4 py-2 text-sm resize-none"
                required
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Post Job
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateJob;
