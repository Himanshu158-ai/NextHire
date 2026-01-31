import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Navbar */}
      <header className="flex items-center justify-between px-6 md:px-16 py-4 border-b">
        <h1 className="text-xl md:text-2xl font-bold text-blue-600">
          NextHire
        </h1>

        <Link
          to="/signup"
          className="text-blue-600 text-sm md:text-base font-medium hover:underline"
        >
          Signup
        </Link>
      </header>

      {/* Login Form */}
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md md:max-w-lg border rounded-lg px-6 py-8 md:px-8 md:py-10 shadow-sm">

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
            Welcome Back
          </h2>

          <p className="text-gray-600 text-center mt-2 text-sm md:text-base">
            Login to continue to NextHire
          </p>

          {/* Form */}
          <form className="mt-8 space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border px-4 py-2.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border px-4 py-2.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md text-base font-medium hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 mt-6 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
