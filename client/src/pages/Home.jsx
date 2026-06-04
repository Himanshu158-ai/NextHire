import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#fafafc] text-slate-700 font-sans selection:bg-pink-200 overflow-x-hidden">

      {/* Background Soft Gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#fff0f0]/60 via-[#ffe3ec]/40 to-[#f4d9fa]/40 pointer-events-none -z-10" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-pink-400/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* ── Navbar ──────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-white/70 backdrop-blur-lg border-b border-slate-100">
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-[#1a1a2e] tracking-tight">
          <svg className="w-8 h-8 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" />
          </svg>
          NextHire
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link to="/jobs" className="hover:text-pink-600 transition-colors">Find Jobs</Link>
          <Link to="/companies" className="hover:text-pink-600 transition-colors">Companies</Link>
          <Link to="/about" className="hover:text-pink-600 transition-colors">About Us</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:block text-sm font-bold text-pink-500 hover:text-pink-600 transition-colors px-4 py-2"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-[#111111] hover:bg-black text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md transition-all hover:-translate-y-0.5 active:scale-95"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-36 flex flex-col items-center text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-pink-100 text-slate-500 text-xs md:text-sm font-semibold mb-8 shadow-sm">
          <span className="text-pink-400">✦</span>
          Over 10,000+ Active Jobs Worldwide
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl leading-[1.1]">
          Discover the job that{" "}
          <br className="hidden md:block" />
          <span className="text-pink-500 underline text-5xl">fits your life.</span>
        </h1>

        <p className="text-base md:text-xl text-slate-500 max-w-2xl mb-12 font-medium leading-relaxed">
          Join thousands of professionals who found their dream careers through
          our curated network of top-tier companies.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-3 md:gap-0 bg-transparent md:bg-white md:border md:border-slate-200 p-0 md:p-2 rounded-none md:rounded-full md:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)]">

          {/* Job input */}
          <div className="flex items-center flex-1 w-full px-5 py-4 md:py-2 bg-white md:bg-transparent rounded-2xl md:rounded-none border md:border-none border-slate-200 md:border-r md:border-slate-200">
            <svg className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Job title, keyword, or company"
              className="w-full bg-transparent text-slate-800 placeholder-slate-400 outline-none focus:ring-0 text-base font-medium"
            />
          </div>

          {/* Location input */}
          <div className="flex items-center flex-1 w-full px-5 py-4 md:py-2 bg-white md:bg-transparent rounded-2xl md:rounded-none border md:border-none border-slate-200">
            <svg className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-slate-800 placeholder-slate-400 outline-none focus:ring-0 text-base font-medium"
            />
          </div>

          {/* Search Button */}
          <Link to="/jobs" className="w-full md:w-auto mt-2 md:mt-0">
            <button className="w-full bg-[#111111] hover:bg-black text-white px-8 py-4 md:py-3 rounded-full font-bold text-base transition-all shadow-md hover:-translate-y-0.5 active:scale-95">
              Search Jobs
            </button>
          </Link>
        </div>
      </section>


      {/* ── CTA Section ──────────────────────────────────────────── */}
      <section className="relative px-6 py-16 md:py-28 border-t border-slate-100 overflow-hidden">
        {/* Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[350px] bg-pink-400/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-pink-100 text-pink-500 text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 inline-block" />
            Start Today — It's Free
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Ready to take the <br className="hidden md:block" />
            next step?
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-medium mb-10 max-w-xl mx-auto">
            Create an account today and let top companies discover you.
            Your dream job is just a click away.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="w-full sm:w-auto">
              <button className="w-full bg-[#111111] hover:bg-black text-white px-10 py-4 rounded-full font-bold text-base transition-all shadow-md hover:-translate-y-0.5 active:scale-95">
                Create Free Account
              </button>
            </Link>
            <Link to="/jobs" className="w-full sm:w-auto">
              <button className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-10 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 active:scale-95 shadow-sm">
                Browse Jobs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Categories Section ───────────────────────────────────── */}
      <section className="px-6 py-16 md:py-24 border-t border-slate-100 bg-white/60">
        <div className="max-w-screen-xl mx-auto">

          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Explore by Category
            </h2>
            <p className="text-base md:text-lg text-slate-500 font-medium">
              Find opportunities tailored to your expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Design */}
            <Link
              to="/jobs?category=design"
              className="group bg-white border border-slate-100 p-7 rounded-[2rem] hover:border-pink-200 hover:shadow-[0_15px_40px_-15px_rgba(244,114,182,0.2)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-pink-50 border border-pink-100 rounded-2xl flex items-center justify-center text-pink-500 mb-5 group-hover:scale-110 group-hover:bg-pink-100 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-1">Design & Creative</h3>
              <p className="text-sm text-slate-400 font-semibold">1,240 open positions</p>
            </Link>

            {/* Engineering */}
            <Link
              to="/jobs?category=engineering"
              className="group bg-white border border-slate-100 p-7 rounded-[2rem] hover:border-pink-200 hover:shadow-[0_15px_40px_-15px_rgba(244,114,182,0.2)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-pink-50 border border-pink-100 rounded-2xl flex items-center justify-center text-pink-500 mb-5 group-hover:scale-110 group-hover:bg-pink-100 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-1">Engineering</h3>
              <p className="text-sm text-slate-400 font-semibold">3,450 open positions</p>
            </Link>

            {/* Marketing */}
            <Link
              to="/jobs?category=marketing"
              className="group bg-white border border-slate-100 p-7 rounded-[2rem] hover:border-pink-200 hover:shadow-[0_15px_40px_-15px_rgba(244,114,182,0.2)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-pink-50 border border-pink-100 rounded-2xl flex items-center justify-center text-pink-500 mb-5 group-hover:scale-110 group-hover:bg-pink-100 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-1">Marketing</h3>
              <p className="text-sm text-slate-400 font-semibold">850 open positions</p>
            </Link>

            {/* Sales */}
            <Link
              to="/jobs?category=sales"
              className="group bg-white border border-slate-100 p-7 rounded-[2rem] hover:border-pink-200 hover:shadow-[0_15px_40px_-15px_rgba(244,114,182,0.2)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-pink-50 border border-pink-100 rounded-2xl flex items-center justify-center text-pink-500 mb-5 group-hover:scale-110 group-hover:bg-pink-100 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-1">Sales & Finance</h3>
              <p className="text-sm text-slate-400 font-semibold">1,100 open positions</p>
            </Link>

          </div>
        </div>
      </section>

      

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-slate-100 bg-white/50 backdrop-blur-sm px-6 py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto text-center">

          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-extrabold text-[#1a1a2e] tracking-tight mb-8">
            <svg className="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" />
            </svg>
            NextHire
          </Link>

          <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-y-5 gap-x-4 md:gap-12 mb-10">
            <Link to="/about" className="text-slate-400 hover:text-pink-500 transition-colors text-sm font-semibold">About Us</Link>
            <Link to="/careers" className="text-slate-400 hover:text-pink-500 transition-colors text-sm font-semibold">Careers</Link>
            <Link to="/privacy" className="text-slate-400 hover:text-pink-500 transition-colors text-sm font-semibold">Privacy Policy</Link>
            <Link to="/contact" className="text-slate-400 hover:text-pink-500 transition-colors text-sm font-semibold">Contact</Link>
          </div>

          <div className="h-px bg-slate-100 w-full max-w-4xl mx-auto mb-8" />

          <p className="text-sm font-semibold text-slate-400">
            © {new Date().getFullYear()} NextHire. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Home;