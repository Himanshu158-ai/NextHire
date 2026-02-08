import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../config/api";

const Signup = () => {
  const [role, setRole] = useState("seeker");
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('')
  const nevigate = useNavigate();

  async function send(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}api/auth/signup`,
        {
          name,
          email,
          password,
          role,
        }
      );
      nevigate('/');
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 md:px-16 py-4 border-b">
        <h1 className="text-2xl font-bold text-blue-600">
          NextHire
        </h1>

        <Link
          to="/login"
          className="text-blue-600 font-medium hover:underline"
        >
          Login
        </Link>
      </header>

      {/* Signup Form Wrapper */}
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md md:max-w-lg border rounded-lg px-6 py-8 md:px-8 md:py-10 shadow-sm">
          
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
            Create Account
          </h2>

          <p className="text-gray-600 text-center mt-2 text-sm md:text-base">
            Join NextHire to get started
          </p>

          {/* Form */}
          <form className="mt-8 space-y-5">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border px-4 py-2.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e)=>{
                  setname(e.target.value);
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border px-4 py-2.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e)=>{
                  setemail(e.target.value);
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full border px-4 py-2.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e)=>{
                  setpassword(e.target.value);
                }}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Role
              </label>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole("seeker")}
                  className={`py-2.5 rounded-md font-medium text-sm border transition
                    ${
                      role === "seeker"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 text-gray-700 hover:border-blue-600"
                    }`}
                >
                  Job Seeker
                </button>

                <button
                  type="button"
                  onClick={() => setRole("recruiter")}
                  className={`py-2.5 rounded-md font-medium text-sm border transition
                    ${
                      role === "recruiter"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 text-gray-700 hover:border-blue-600"
                    }`}
                >
                  Recruiter
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md text-base font-medium hover:bg-blue-700 transition"
              onClick={(send)}
            >
              Sign Up
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;
