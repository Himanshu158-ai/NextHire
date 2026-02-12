import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../config/api";

const Profile = () => {

    const nevigate = useNavigate();
    const _id = localStorage.getItem("userID");
    const [user, setuser] = useState([]);
    const [jobs, setjobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getuser = async () => {
            try {
                const res = await axios.post(`${API_URL}/api/profile`, { _id });
                setuser(res.data.user);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        }
        getuser();
    }, []);

    useEffect(() => {
        const getjobs = async () => {
            try {
                const res = await axios.post(`${API_URL}/api/jobs/${_id}`);
                setjobs(res.data.jobs);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        }
        getjobs();
    }, []);

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
        const res = await axios.delete(`${API_URL}/api/jobs/${id}`);
        toast.success(res.data.message);
        nevigate('/profile');
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* Header */}
            <header className="flex items-center justify-between px-6 md:px-16 py-4 border-b">
                <h1 className="text-xl md:text-2xl font-bold text-blue-600">
                    Profile
                </h1>

                <div className="flex gap-2">
                    <span
                        className={`text-sm px-3 py-1 rounded-full font-medium
            ${user.role === "recruiter"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                    >
                        {user.role === "recruiter" ? "Recruiter" : "Job Seeker"}
                    </span>
                    <button className="text-red-600 font-semibold" onClick={logout}>logout</button>
                </div>
            </header>

            {/* Profile Card */}
            <main className="flex-1 px-4 sm:px-6 md:px-16 py-10">
                <div className="max-w-4xl mx-auto border rounded-lg p-6 md:p-8">

                    {/* Top Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {user.name}
                            </h2>
                            <p className="text-gray-600">
                                {user.email}
                            </p>
                        </div>

                        <Link to='/editprofile'>
                            <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-600 hover:text-white transition">
                                Edit Profile
                            </button></Link>
                    </div>

                    {/* Divider */}
                    <hr className="my-8" />

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        {/* Education */}
                        <div>
                            <p className="text-sm text-gray-500">Education</p>
                            <p className="font-medium text-gray-900">
                                {user.education || "Not mentioned"}
                            </p>
                        </div>

                        {/* Experience */}
                        <div>
                            <p className="text-sm text-gray-500">Experience</p>
                            <p className="font-medium text-gray-900">
                                {user.experience || "Not mentioned"}
                            </p>
                        </div>

                        {/* Location */}
                        <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium text-gray-900">
                                {user.location || "Not mentioned"}
                            </p>
                        </div>

                        {/* Role */}
                        <div>
                            <p className="text-sm text-gray-500">Account Type</p>
                            <p className="font-medium text-gray-900 capitalize">
                                {user.role}
                            </p>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-10">
                        <p className="text-sm text-gray-500 mb-3">
                            Skills
                        </p>

                        {user?.skills?.length === 0 ? (
                            <p className="text-gray-400 text-sm">
                                No skills added
                            </p>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {user?.skills?.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </main>

            {/* Posted Jobs */}
            <main className="flex-1 px-4 sm:px-6 md:px-16 py-10 justify-center items-center">
                <h2 className="text-2xl md:text-3xl text-gray-600 mb-6 text-center font-semibold">
                    Your Posted Jobs
                </h2>

                {jobs.length === 0 ? <h3 className="text-center text-gray-800">No jobs mention</h3> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {jobs.map(job => (
                        <div
                            key={job._id}
                            className="border rounded-lg p-6 hover:shadow-sm transition"
                        >
                            <div className="flex justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {job.title}
                                </h3>
                                <Link to={`/jobs/submissions/${job._id}`} className="text-sm text-blue-400 underline">Submissions</Link>
                            </div>

                            <p className="text-gray-600 mt-1">
                                {job.company}
                            </p>

                            <div className="text-sm text-gray-500 mt-2">
                                📍 {job.location} • {job.jobType}
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {job.skillsRequired.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Action */}

                            <div className="flex justify-between">
                                <Link
                                    to={`/jobs/${job._id}`}
                                    className="inline-block mt-5 text-blue-600 font-medium hover:underline"
                                >
                                    View Details →
                                </Link>
                                <button className="inline-block mt-5 text-red-600 font-medium hover:underline" onClick={() => deleteJob(job._id)}>
                                    Delete Job
                                </button>
                            </div>
                        </div>
                    ))}
                </div>}
            </main>

            {/* Footer */}
            <footer className="flex items-center justify-center py-4 border-t">
                <p className="text-sm text-gray-500">
                    &copy; 2023 NextHire. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Profile;
