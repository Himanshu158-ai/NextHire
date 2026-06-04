import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import { API_URL } from '../config/api'
import { toast } from "react-toastify";


const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const userID = localStorage.getItem("userID");
  const [applied, setApplied] = useState(false);
  const [status, setStatus] = useState('not_applied');

  const handleApply = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/apply/`, { jobId: id, userId: userID }, { withCredentials: true });
      toast.success(res.data.message);
      setStatus('pending');
      setApplied(true);
    } catch (error) {
      toast.error("You are not allowed to apply");
    }
  };

  useEffect(() => {
    const fetchUserSubmissions = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/apply/user/${id}`, { withCredentials: true });
        if (res.data.success) {
          const submissionStatus = res.data.submissions.status;
          setApplied(true);
          setStatus(submissionStatus);
        } else {
          setApplied(false);
          setStatus('not_applied');
        }
      } catch (error) {
        setApplied(false);
        setStatus('not_applied');
      } finally {
        setLoading(false);
      }
    };
    fetchUserSubmissions();
  }, [id]);

  useEffect(() => {
    const fetchJobsbyID = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/jobs/${id}`);
        setJob(res.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsbyID();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafc] flex flex-col items-center justify-center font-sans">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#fafafc] flex items-center justify-center">
        <p className="text-slate-500 text-lg font-medium">Job not found</p>
      </div>
    );
  }

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  // Mock colors for company logo
  const colors = ["bg-green-500", "bg-cyan-500", "bg-blue-500", "bg-rose-500", "bg-purple-500", "bg-orange-500"];
  const logoColor = colors[job.company?.length % colors.length || 0];

  return (
    <div className="min-h-screen font-sans overflow-x-hidden relative flex flex-col bg-[#fafafc]">
      
      {/* Background Soft Gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#fff0f0]/80 via-[#ffe3ec]/60 to-[#f4d9fa]/60 pointer-events-none -z-10"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-pink-400/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Navbar */}
      <header className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 max-w-screen-2xl mx-auto w-full">
        <Link to="/jobs" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Jobs
        </Link>
        <div className="flex items-center gap-2 text-xl font-extrabold text-[#1a1a2e] tracking-tight">
           <svg className="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" />
          </svg>
          NextHire
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-white p-8 md:p-12 relative overflow-hidden">
          
          {/* Header Row: Company Logo + Bookmark */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl ${logoColor} shadow-sm`}>
                {job.company?.charAt(0)?.toUpperCase() || "C"}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-xl">{job.company}</h3>
                <p className="text-slate-500 font-medium text-sm mt-0.5 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {job.location || "Anywhere"}
                </p>
              </div>
            </div>
          </div>

          {/* Job Title */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-8">
            {job.title}
          </h1>

          {/* Details Grid */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-2 mb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Job Type</p>
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {job.jobType || "Full-time"}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Experience</p>
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {job.experienceRequired || "N/A"}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Salary</p>
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="">{job.salary || "Not specified"}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Posted</p>
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {formatDate(job.createdAt)}
                </div>
              </div>

            </div>
          </div>

          {/* Skills */}
          {job.skillsRequired?.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-extrabold text-slate-900 mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skillsRequired.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white border border-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-sm shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-12">
            <h3 className="text-lg font-extrabold text-slate-900 mb-4">About the Role</h3>
            <div className="text-slate-600 leading-relaxed space-y-4 whitespace-pre-line text-lg">
              {job.description}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 w-full md:w-auto">
               {job.postedBy && (
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 font-bold flex items-center justify-center">
                     {job.postedBy.name?.charAt(0)?.toUpperCase()}
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 font-medium">Posted by</p>
                     <p className="text-sm font-bold text-slate-800">{job.postedBy.name}</p>
                   </div>
                 </div>
               )}
            </div>

            <button
              disabled={status !== 'not_applied'}
              className={`w-full md:w-auto px-10 py-4 rounded-full font-bold text-lg transition-all ${
                status !== 'not_applied' 
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" 
                  : "bg-[#111111] hover:bg-black text-white hover:-translate-y-0.5 active:translate-y-0"
              }`}
              onClick={handleApply}
            >
              {
                status === "pending" 
                  ? "Application Pending" 
                  : status === "shortlisted" 
                    ? "Shortlisted 🎉" 
                    : "Apply Now"
              }
            </button>
          </div>

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

export default JobDetails;
