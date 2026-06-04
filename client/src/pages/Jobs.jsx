import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API_URL } from '../config/api'

const Jobs = () => {
  const { state } = useLocation();
  const userL = JSON.parse(
    localStorage.getItem("userLogo") || "{}"
  );

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/jobs`);
        setJobs(res.data.jobs);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fff0f0] via-[#ffe3ec] to-[#f4d9fa] flex items-center justify-center font-sans">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafc] font-sans overflow-x-hidden relative flex flex-col">
      
      {/* Background Soft Gradients (Similar to Home) */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#fff0f0]/60 via-[#ffe3ec]/40 to-[#f4d9fa]/40 pointer-events-none -z-10"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-pink-400/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Add Job Button (Floating) */}
      <Link to="/createjob">
        <button
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#111111] text-white text-3xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:bg-black active:scale-95 transition-all z-50 flex justify-center items-center font-light pb-1 hover:-translate-y-1"
          title="Post a Job"
        >
          +
        </button>
      </Link>

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
          <Link to="/jobs" className="text-pink-600 transition-colors">Find a Job</Link>
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

      {/* Main Content */}
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-6 py-10 z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
              Explore Opportunities
            </h1>
            <p className="text-slate-500 text-lg">
              Find your next career move among top companies.
            </p>
          </div>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800">No jobs found</h2>
            <p className="text-slate-500 mt-2">Check back later or adjust your filters.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:gap-10">
            {jobs.map((job, index) => {
              
              // Generate a mock color for the company logo based on its name
              const colors = ["bg-green-500", "bg-cyan-500", "bg-blue-500", "bg-rose-500", "bg-purple-500", "bg-orange-500"];
              const logoColor = colors[job.company?.length % colors.length || 0];
              
              // Simulate random "posted" days
              const postedDays = index === 0 ? "Yesterday" : `${index + 2} days ago`;

              // First card gets the pink glow emphasis
              const isFeatured = index === 0;

              return (
                <div
                  key={job._id}
                  className={`flex flex-col bg-white rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isFeatured 
                      ? "shadow-[0_15px_40px_-15px_rgba(244,114,182,0.3)] border-2 border-pink-100" 
                      : "shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-100/80"
                  }`}
                >
                  {/* Card Body */}
                  <div className="p-8 flex-1">
                    {/* Header: Logo + Name + Bookmark */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${logoColor} shadow-sm`}>
                          {job.company?.charAt(0)?.toUpperCase() || "C"}
                        </div>
                        <h3 className="font-bold text-slate-700 text-lg">{job.company || "Company"}</h3>
                      </div>
                    </div>

                    {/* Job Title */}
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-6 line-clamp-1">
                      {job.title}
                    </h2>

                    {/* Details Grid 2x2 */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-slate-600 font-medium mb-8">
                      {/* Location */}
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="truncate">{job.location || "Anywhere"}</span>
                      </div>
                      {/* Job Type */}
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{job.jobType || "Full-time"}</span>
                      </div>
                      {/* Category */}
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        <span className="truncate">{job.category || "Technology"}</span>
                      </div>
                      {/* Salary */}
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{job.salary || "$120k/yearly"}</span>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <Link to={`/jobs/${job._id}`} className="block w-full">
                      <button className="w-full bg-[#111111] hover:bg-black text-white py-3.5 rounded-full font-bold text-[15px] transition-all shadow-md">
                        Apply
                      </button>
                    </Link>
                  </div>

                  {/* Card Footer */}
                  <div className={`py-4 text-center text-xs font-bold tracking-widest uppercase ${
                    isFeatured ? "bg-pink-50 text-pink-400" : "bg-slate-50 text-slate-400"
                  }`}>
                    POSTED {postedDays}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-100 bg-white/50 backdrop-blur-sm z-10">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-400">
            © {new Date().getFullYear()} NextHire. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Jobs;
