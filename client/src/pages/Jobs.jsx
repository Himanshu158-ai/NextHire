import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {API_URL} from '../config/api'

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
      <div className="min-h-screen flex items-center justify-center">
        Loading jobs...
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Add button */}
      <Link to="/createjob">
        <button
          className="
    fixed bottom-6 left-1/2 -translate-x-1/2
    w-10 h-10
    rounded-full
    bg-blue-600
    text-white text-3xl
    shadow-xl
    hover:bg-blue-700
    active:scale-95
    transition
    z-50
    flex justify-center items-center
  "
        >
          +
        </button>
      </Link>

      {/* Navbar */}
      <header className="flex items-center justify-between px-6 md:px-16 py-4 border-b">
        <h1 className="text-xl md:text-2xl font-bold text-blue-600">
          NextHire
        </h1>

        <Link to="/profile">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold cursor-pointer">
            {userL?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        </Link>
      </header>

      {/* Jobs Feed */}
      <main className="flex-1 px-4 sm:px-6 md:px-16 py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Trending Jobs
        </h2>

        {jobs.length === 0 ? <h1>No jobs mention</h1> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map(job => (
            <div
              key={job._id}
              className="border rounded-lg p-6 hover:shadow-sm transition"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {job.title}
              </h3>

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
              <Link
                to={`/jobs/${job._id}`}
                className="inline-block mt-5 text-blue-600 font-medium hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>}
      </main>
      <footer className="flex items-center justify-center py-4 border-t">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} NextHire. All rights reserved.
        </p>
      </footer>

    </div>
  );
};

export default Jobs;
