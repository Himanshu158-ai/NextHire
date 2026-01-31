import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    // Dummy data (later backend se aayega)
    const user = {
        name: "Himanshu Singh",
        email: "seeker@test.com",
        role: "seeker", // seeker | recruiter
        skills: ["React", "Node.js", "MongoDB"],
        education: "B.Tech Computer Science",
        experience: "Fresher",
        location: "Delhi"
    };

    const nevigate = useNavigate();

    async function logout(){
        const res = await axios.get("http://localhost:5000/api/auth/logout");
        localStorage.removeItem("token");
        localStorage.removeItem("userLogo");
        console.log(res.data.message);
        nevigate('/');
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

                        {user.skills.length === 0 ? (
                            <p className="text-gray-400 text-sm">
                                No skills added
                            </p>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {user.skills.map((skill, index) => (
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
        </div>
    );
};

export default Profile;
