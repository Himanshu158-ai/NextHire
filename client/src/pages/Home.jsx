import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-white">
          NextHire<span className="text-blue-500">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/jobs" className="hover:text-white transition-colors font-medium">Find Jobs</Link>
          <Link to="/companies" className="hover:text-white transition-colors font-medium">Companies</Link>
          <Link to="/about" className="hover:text-white transition-colors font-medium">About Us</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden sm:block text-blue-400 hover:text-blue-300 font-semibold transition-colors">
            Log In
          </Link>
          <Link to="/signup" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full font-semibold shadow-md shadow-blue-900/20 transition-all transform hover:-translate-y-0.5">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-16 md:py-32 flex flex-col items-center text-center">
        {/* Background Gradients (Subtle & Classy) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs md:text-sm font-medium mb-8 shadow-sm">
          <span className="text-blue-400">✦</span> Over 10,000+ Active Jobs Worldwide
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 max-w-4xl leading-[1.15]">
          Discover the job that <br className="hidden md:block" /> 
          <span className="text-blue-500">
            fits your life.
          </span>
        </h1>

        <p className="text-base md:text-xl text-slate-400 max-w-2xl mb-10 md:mb-14">
          Join thousands of professionals who have found their dream careers through our curated network of top-tier companies.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-3 md:gap-0 bg-transparent md:bg-slate-900/60 md:backdrop-blur-xl md:border md:border-slate-800 p-0 md:p-2 rounded-3xl md:rounded-full shadow-none md:shadow-2xl">
          
          <div className="flex items-center flex-1 w-full px-5 py-4 md:py-2 bg-slate-900 md:bg-transparent rounded-2xl md:rounded-none border md:border-none border-slate-800 md:border-r md:border-slate-700">
            <svg className="w-6 h-6 text-slate-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Job title, keyword, or company" 
              className="w-full bg-transparent text-white placeholder-slate-500 outline-none focus:ring-0 text-base md:text-lg"
            />
          </div>
          
          <div className="flex items-center flex-1 w-full px-5 py-4 md:py-2 bg-slate-900 md:bg-transparent rounded-2xl md:rounded-none border md:border-none border-slate-800">
            <svg className="w-6 h-6 text-slate-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Location or Remote" 
              className="w-full bg-transparent text-white placeholder-slate-500 outline-none focus:ring-0 text-base md:text-lg"
            />
          </div>

          <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 md:py-3 rounded-2xl md:rounded-full font-bold text-lg md:text-base transition-all shadow-md shadow-blue-900/20 mt-2 md:mt-0">
            Search Jobs
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-6 py-16 md:py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Explore by Category</h2>
            <p className="text-base md:text-lg text-slate-400">Find opportunities tailored to your expertise.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Category Cards */}
            <Link to="/jobs?category=design" className="group bg-slate-950/50 border border-slate-800 p-6 md:p-8 rounded-3xl hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-300">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-400 mb-5 md:mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-transform">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Design & Creative</h3>
              <p className="text-sm md:text-base text-slate-400">1,240 open positions</p>
            </Link>

            <Link to="/jobs?category=engineering" className="group bg-slate-950/50 border border-slate-800 p-6 md:p-8 rounded-3xl hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-300">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-400 mb-5 md:mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-transform">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Engineering</h3>
              <p className="text-sm md:text-base text-slate-400">3,450 open positions</p>
            </Link>

            <Link to="/jobs?category=marketing" className="group bg-slate-950/50 border border-slate-800 p-6 md:p-8 rounded-3xl hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-300">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-400 mb-5 md:mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-transform">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Marketing</h3>
              <p className="text-sm md:text-base text-slate-400">850 open positions</p>
            </Link>

            <Link to="/jobs?category=sales" className="group bg-slate-950/50 border border-slate-800 p-6 md:p-8 rounded-3xl hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-300">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-400 mb-5 md:mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-transform">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Sales & Finance</h3>
              <p className="text-sm md:text-base text-slate-400">1,100 open positions</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-16 md:py-24 overflow-hidden border-t border-slate-800 bg-slate-900/50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">Ready to take the next step?</h2>
          <p className="text-base md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Create an account today and let top companies discover you. Your dream job is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl md:rounded-full font-bold text-lg md:text-base transition-all shadow-md shadow-blue-900/20">
              Create Free Account
            </Link>
            <Link to="/jobs" className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-8 py-4 rounded-2xl md:rounded-full font-bold text-lg md:text-base transition-all">
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-8">NextHire.</h2>
          <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-y-6 gap-x-4 md:gap-12 mb-10 md:mb-12">
            <Link to="/about" className="text-slate-400 hover:text-white transition-colors text-center md:text-left">About Us</Link>
            <Link to="/careers" className="text-slate-400 hover:text-white transition-colors text-center md:text-left">Careers</Link>
            <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors text-center md:text-left">Privacy Policy</Link>
            <Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-center md:text-left">Contact</Link>
          </div>
          <div className="h-px bg-slate-800 w-full max-w-4xl mx-auto mb-8"></div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} NextHire. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
