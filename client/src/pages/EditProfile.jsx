import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { API_URL } from "../config/api";

const EditProfile = () => {
  const _id = localStorage.getItem("userID");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
    education: "",
    experience: "",
    location: "",
    skills: [],
  });

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
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [_id]);

  async function change(e) {
    e.preventDefault();
    try {
      const res = await axios.patch(`${API_URL}/api/profile/edit`, { user });
      toast.success(res.data.message || "Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to update profile");
    }
  }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafc] flex flex-col items-center justify-center font-sans">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans overflow-x-hidden relative flex flex-col bg-[#fafafc]">
      
      {/* Background Soft Gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#fff0f0]/80 via-[#ffe3ec]/60 to-[#f4d9fa]/60 pointer-events-none -z-10"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-pink-400/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Navbar */}
      <header className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 max-w-screen-2xl mx-auto w-full">
        <Link to="/profile" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Profile
        </Link>
        <div className="flex items-center gap-2 text-xl font-extrabold text-[#1a1a2e] tracking-tight">
           <svg className="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" />
          </svg>
          NextHire
        </div>
      </header>

      {/* Form Area */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-white p-8 md:p-12 relative overflow-hidden">
          
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Edit Your Profile
            </h1>
            <p className="text-slate-500 text-base md:text-lg">
              Update your details to stand out to recruiters and land your dream job.
            </p>
          </div>

          <form onSubmit={change} className="space-y-8">
            
            {/* Non-editable Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</p>
                <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
                  {user.name}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  {user.email}
                </div>
              </div>
            </div>

            {/* Editable Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Education</label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg>
                  <input
                    value={user.education}
                    placeholder="e.g. B.Tech Computer Science"
                    onChange={(e) => setUser({ ...user, education: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-11 pr-5 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Experience</label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <input
                    value={user.experience}
                    placeholder="e.g. Fresher / 1-2 years"
                    onChange={(e) => setUser({ ...user, experience: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-11 pr-5 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <input
                    value={user.location}
                    placeholder="e.g. Delhi / Remote"
                    onChange={(e) => setUser({ ...user, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-11 pr-5 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Skills</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="Type a skill and press Enter (e.g. React)"
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
                {(!user.skills || user.skills.length === 0) ? (
                  <span className="text-sm text-slate-400 italic my-auto ml-1">No skills added yet...</span>
                ) : (
                  user.skills.map((skill, index) => (
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

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-[#111111] hover:bg-black text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md transform hover:-translate-y-1"
              >
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
