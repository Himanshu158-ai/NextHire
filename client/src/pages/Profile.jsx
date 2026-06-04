import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../config/api";

const Profile = () => {

    const nevigate = useNavigate();
    const _id = localStorage.getItem("userID");
    const [user, setuser] = useState({});
    const [jobs, setjobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getuser = async () => {
            try {
                const res = await axios.post(`${API_URL}/api/profile`, { _id });
                setuser(res.data.user);
            } catch (error) {
                console.log(error.message);
            }
        }
        getuser();
    }, [_id]);

    useEffect(() => {
        const getjobs = async () => {
            try {
                const res = await axios.post(`${API_URL}/api/jobs/${_id}`);
                setjobs(res.data.jobs);
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        }
        getjobs();
    }, [_id]);

    async function logout() {
        const res = await axios.get(`${API_URL}/api/auth/logout`);
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("user");
        localStorage.removeItem("userID");
        localStorage.removeItem("userLogo");
        toast.success(res.data.message);
        nevigate('/');
    }

    async function deleteJob(id) {
        try {
            const res = await axios.delete(`${API_URL}/api/jobs/${id}`);
            toast.success(res.data.message);
            setjobs(jobs.filter(job => job._id !== id));
        } catch (error) {
            toast.error("Failed to delete job");
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fafafc] flex flex-col items-center justify-center font-sans">
                <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans overflow-x-hidden relative flex flex-col bg-[#fafafc]">

            {/* Background Soft Gradients */}
            <div className="fixed inset-0 bg-gradient-to-br from-[#fff0f0]/80 via-[#ffe3ec]/60 to-[#f4d9fa]/60 pointer-events-none -z-10"></div>
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-pink-400/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

            {/* Navbar */}
            <nav className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-6 max-w-screen-2xl mx-auto w-full">
                <Link to="/" className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold text-[#1a1a2e] tracking-tight">
                    <svg className="w-8 h-8 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" />
                    </svg>
                    NextHire
                </Link>

                <div className="flex items-center gap-6">
                    <span
                        className={`text-xs md:text-sm px-4 py-1.5 rounded-full font-bold uppercase tracking-wider
                        ${user.role === "recruiter"
                                ? "bg-green-100 text-green-600 border border-green-200"
                                : "bg-blue-100 text-blue-600 border border-blue-200"
                            }`}
                    >
                        {user.role === "recruiter" ? "Recruiter" : "Job Seeker"}
                    </span>
                    <button 
                        className="text-slate-400 hover:text-red-500 font-bold text-sm transition-colors" 
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 md:px-12 py-10 z-10">
                
                {/* Profile Card */}
                <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-white p-5 sm:p-8 md:p-12 relative overflow-hidden mb-16">
                    
                    {/* Top Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-pink-200 to-purple-400 text-white flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-pink-100">
                                {user.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                                    {user.name}
                                </h2>
                                <p className="text-slate-500 font-medium text-lg flex items-center gap-2 mt-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        <Link to='/editprofile'>
                            <button className="w-full sm:w-auto bg-[#111111] hover:bg-black text-white px-8 py-3 rounded-full font-bold text-sm transition-all shadow-md active:scale-95">
                                Edit Profile
                            </button>
                        </Link>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50 border border-slate-100 rounded-3xl p-6">
                        
                        {/* Education */}
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Education</p>
                            <div className="flex items-center gap-2 text-slate-800 font-bold">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg>
                                <span className="truncate">{user.education || "N/A"}</span>
                            </div>
                        </div>

                        {/* Experience */}
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Experience</p>
                            <div className="flex items-center gap-2 text-slate-800 font-bold">
                                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <span className="truncate">{user.experience || "N/A"}</span>
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Location</p>
                            <div className="flex items-center gap-2 text-slate-800 font-bold">
                                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span className="truncate">{user.location || "N/A"}</span>
                            </div>
                        </div>

                        {/* Role */}
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Account Type</p>
                            <div className="flex items-center gap-2 text-slate-800 font-bold capitalize">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                {user.role}
                            </div>
                        </div>

                    </div>

                    {/* Skills */}
                    <div className="mt-10">
                        <h3 className="text-lg font-extrabold text-slate-900 mb-4">Skills</h3>
                        {(!user?.skills || user.skills.length === 0) ? (
                            <p className="text-slate-400 italic">No skills added yet.</p>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {user.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-white border border-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-sm shadow-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Posted Jobs (If any) */}
                <div className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 text-center md:text-left">
                        {user.role === "recruiter" ? "Your Posted Jobs" : "Your Applications"}
                    </h2>

                    {jobs.length === 0 ? (
                        <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-100">
                            <p className="text-slate-500 text-lg font-medium">No jobs to display here.</p>
                        </div>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                            {jobs.map((job) => {
                                const colors = ["bg-green-500", "bg-cyan-500", "bg-blue-500", "bg-rose-500", "bg-purple-500", "bg-orange-500"];
                                const logoColor = colors[job.company?.length % colors.length || 0];

                                return (
                                    <div
                                        key={job._id}
                                        className="flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-100/80"
                                    >
                                        <div className="p-5 sm:p-8 flex-1">
                                            {/* Header */}
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${logoColor} shadow-sm`}>
                                                        {job.company?.charAt(0)?.toUpperCase() || "C"}
                                                    </div>
                                                    <h3 className="font-bold text-slate-700 text-lg">{job.company || "Company"}</h3>
                                                </div>
                                                <Link to={`/jobs/submissions/${job._id}`} className="text-xs font-bold uppercase tracking-wider text-pink-500 hover:text-pink-600 bg-pink-50 px-3 py-1.5 rounded-lg border border-pink-100">
                                                    Submissions
                                                </Link>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6 line-clamp-1">
                                                {job.title}
                                            </h2>

                                            {/* Details */}
                                            <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-slate-600 font-medium mb-8">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                    <span className="truncate">{job.location || "Anywhere"}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span>{job.jobType || "Full-time"}</span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-4 mt-auto">
                                                <Link to={`/jobs/${job._id}`} className="flex-1">
                                                    <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-full font-bold text-[14px] transition-all">
                                                        View Job
                                                    </button>
                                                </Link>
                                                <button 
                                                    className="w-12 h-12 rounded-full border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center transition-all"
                                                    onClick={() => deleteJob(job._id)}
                                                    title="Delete Job"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </main>

            {/* Footer */}
            <footer className="py-6 mt-auto border-t border-slate-100 bg-white/50 backdrop-blur-sm z-10">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12 text-center">
                    <p className="text-sm font-semibold text-slate-400">
                        © {new Date().getFullYear()} NextHire. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Profile;
