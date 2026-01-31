import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Navbar */}
      <header className="flex items-center justify-between px-6 md:px-16 py-4 border-b">
        <h1 className="text-xl md:text-2xl font-bold text-blue-600">
          NextHire
        </h1>

        <div className="flex items-center gap-4 md:gap-6">
          <Link
            to="/login"
            className="text-blue-600 text-sm md:text-base font-medium hover:underline"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="border border-blue-600 text-blue-600 px-3 py-1.5 md:px-4 md:py-2 rounded-md text-sm md:text-base font-medium hover:bg-blue-600 hover:text-white transition"
          >
            Signup
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 max-w-3xl">
          Find Your <span className="text-blue-600">Next Job</span>
          <br className="hidden sm:block" /> Faster & Smarter
        </h2>

        <p className="text-gray-600 mt-4 sm:mt-6 max-w-xl text-base sm:text-lg">
          NextHire helps job seekers discover opportunities and recruiters
          hire the right talent without hassle.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-md text-base sm:text-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </Link>

          <Link
            to="/jobs"
            className="border border-blue-600 text-blue-600 px-6 sm:px-8 py-3 rounded-md text-base sm:text-lg font-medium hover:bg-blue-600 hover:text-white transition"
          >
            Browse Jobs
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-3 sm:py-4 text-gray-500 text-xs sm:text-sm border-t">
        © {new Date().getFullYear()} NextHire. All rights reserved.
      </footer>

    </div>
  );
};

export default Home;
