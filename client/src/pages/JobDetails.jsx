import React from "react";
import { Link, useParams } from "react-router-dom";

// Dummy data (later backend se aayega)
const jobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Google",
    location: "Delhi",
    type: "Full-time",
    experience: "0-2 years",
    salary: "6-10 LPA",
    skills: ["React", "JavaScript", "CSS"],
    description:
      "We are looking for a frontend developer with strong knowledge of React and modern JavaScript."
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "Microsoft",
    location: "Remote",
    type: "Remote",
    experience: "1-3 years",
    salary: "8-12 LPA",
    skills: ["Node.js", "MongoDB", "Express"],
    description:
      "Looking for a backend developer experienced in Node.js and MongoDB to build scalable APIs."
  }
];

const JobDetails = () => {
  const { id } = useParams();

  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Job not found</p>
      </div>
    );
  }

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
        <div className="max-w-3xl mx-auto border rounded-lg p-6 md:p-8">

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {job.title}
          </h2>

          <p className="text-gray-600 mt-1">
            {job.company}
          </p>

          <div className="text-sm text-gray-500 mt-2">
            📍 {job.location} • {job.type}
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
            <div>
              <span className="font-medium">Experience:</span> {job.experience}
            </div>
            <div>
              <span className="font-medium">Salary:</span> {job.salary}
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Skills Required
            </h3>

            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Job Description
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Apply Button */}
          <button
            className="mt-8 w-full bg-blue-600 text-white py-3 rounded-md text-base font-medium hover:bg-blue-700 transition"
          >
            Apply Now
          </button>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;
