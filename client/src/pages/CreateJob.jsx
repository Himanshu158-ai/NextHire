import React, { useState } from "react";
import axios from "axios"
import { API_URL } from "../config/api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const CreateJob = () => {
  const navigate = useNavigate();
  const userL = JSON.parse(
    localStorage.getItem("userLogo") || "{}"
  );
  
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

    try {
      const res = await axios.post(`${API_URL}/api/jobs`, jobData, {
        withCredentials: true,
      })
      
      toast.success("Job created successfully");
      navigate("/jobs");
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden relative flex flex-col bg-[#fafafc]">
      
      {/* Background Soft Gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#fff0f0]/80 via-[#ffe3ec]/60 to-[#f4d9fa]/60 pointer-events-none -z-10"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-pink-400/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 max-w-screen-2xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-[#1a1a2e] tracking-tight">
          <svg className="w-8 h-8 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" />
          </svg>
          NextHire
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <Link to="/jobs" className="hover:text-pink-600 transition-colors">Find a Job</Link>
          <Link to="/companies" className="hover:text-pink-600 transition-colors">Companies</Link>
          <Link to="/how-it-works" className="hover:text-pink-600 transition-colors">How Its Works</Link>
          <Link to="/blog" className="hover:text-pink-600 transition-colors">Blog</Link>
          <Link to="/contact" className="hover:text-pink-600 transition-colors">Contact</Link>
        </div>

        <Link to="/profile">
          <div className="w-10 h-10 rounded-full bg-pink-100 border border-pink-200 text-pink-600 flex items-center justify-center font-bold cursor-pointer hover:shadow-md hover:bg-pink-200 transition-all">
            {userL?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        </Link>
      </nav>

      {/* Form Area */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10 z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-white p-8 md:p-12 relative overflow-hidden">
          
          {/* Decorative Top Accent */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-300 via-pink-400 to-purple-400"></div>

          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Post a New Opportunity
            </h1>
            <p className="text-slate-500 text-base md:text-lg">
              Find the perfect candidate by creating a detailed job listing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Title & Company Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 px-5 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 focus:bg-white transition-all shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={jobData.company}
                  onChange={handleChange}
                  placeholder="e.g. Google or HireMe Inc"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 px-5 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 focus:bg-white transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Location & Job Type Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <input
                    type="text"
                    name="location"
                    value={jobData.location}
                    onChange={handleChange}
                    placeholder="e.g. New York / Remote"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-11 pr-5 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 focus:bg-white transition-all shadow-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Job Type</label>
                <div className="relative">
                   <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <select
                    name="jobType"
                    value={jobData.jobType}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-11 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 focus:bg-white transition-all shadow-sm appearance-none"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Salary & Experience Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Salary (Optional)</label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <input
                    type="text"
                    name="salary"
                    value={jobData.salary}
                    onChange={handleChange}
                    placeholder="e.g. $120k/yearly"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-11 pr-5 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Experience Required</label>
                <div className="relative">
                   <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  <input
                    type="text"
                    name="experienceRequired"
                    value={jobData.experienceRequired}
                    onChange={handleChange}
                    placeholder="e.g. 2-5 years"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-11 pr-5 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Required Skills</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="Type a skill and press Enter or Add (e.g. React)"
                  className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 px-5 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 focus:bg-white transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-pink-100 hover:bg-pink-200 text-pink-600 px-6 rounded-xl text-sm font-bold transition-colors shadow-sm"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 min-h-[40px] items-start p-3 bg-slate-50/50 border border-slate-100 rounded-xl">
                {jobData.skillsRequired.length === 0 ? (
                  <span className="text-sm text-slate-400 italic my-auto ml-1">No skills added yet...</span>
                ) : (
                  jobData.skillsRequired.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white border border-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 shadow-sm animate-[fadeIn_0.2s_ease-out]"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-slate-400 hover:text-red-500 transition-colors w-4 h-4 flex items-center justify-center rounded-full hover:bg-red-50"
                        title="Remove skill"
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
              <label className="block text-sm font-bold text-slate-700 mb-2">Job Description</label>
              <textarea
                name="description"
                value={jobData.description}
                onChange={handleChange}
                placeholder="Describe the responsibilities, requirements, and benefits..."
                rows="6"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 px-5 py-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 focus:bg-white transition-all shadow-sm resize-none"
                required
              ></textarea>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#111111] hover:bg-black text-white py-4 rounded-xl font-bold text-lg transition-all shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] transform hover:-translate-y-1"
              >
                Publish Job Listing
              </button>
            </div>
          </form>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 mt-auto border-t border-slate-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-400">
            © {new Date().getFullYear()} NextHire. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CreateJob;
