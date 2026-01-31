import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'

// Dummy data (later backend se aayega)

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchJobsbyID = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        console.log(res.data);
        setJob(res.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsbyID();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading jobs...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Job not found</p>
      </div>
    );
  }

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });


  return (

    <div className="min-h-screen bg-white flex flex-col">

      {/* Navbar */}
      <header className="flex items-center justify-between px-6 md:px-16 py-4 border-b">
        <Link to="/jobs" className="text-blue-600 font-medium hover:underline">
          ← Back to Jobs
        </Link>

        <h1 className="text-xl md:text-2xl font-bold text-blue-600">
          NextHire
        </h1>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 sm:px-6 md:px-16 py-10">
        <div className="max-w-3xl mx-auto border rounded-lg p-6 md:p-8 shadow-sm">

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {job.title}
          </h2>

          <p className="text-gray-600 mt-1">
            {job.company}
          </p>

          <div className="text-sm text-gray-500 mt-2 flex flex-wrap gap-3">
            <span>📍 {job.location}</span>
            <span>•</span>
            <span>{job.jobType}</span>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
            <div>
              <span className="font-medium">Experience:</span>{" "}
              {job.experienceRequired}
            </div>

            <div>
              <span className="font-medium">Salary:</span>{" "}
              {job.salary}
            </div>

            {job.lastDateToApply && (
              <div>
                <span className="font-medium">Last Date:</span>{" "}
                {formatDate(job.lastDateToApply)}
              </div>
            )}

            <div>
              <span className="font-medium">Posted On:</span>{" "}
              {formatDate(job.createdAt)}
            </div>
          </div>

          {/* Skills */}
          {job.skillsRequired?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Skills Required
              </h3>

              <div className="flex flex-wrap gap-2">
                {job.skillsRequired.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Job Description
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <button
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition"
            >
              Apply Now
            </button>

            {job.postedBy && (
              <p className="text-sm text-gray-600">
                👤 Posted by{" "}
                <span className="font-medium text-gray-900">
                  {job.postedBy.name}
                </span>
              </p>
            )}
          </div>


        </div>
      </main>
    </div>

  );
};

export default JobDetails;
