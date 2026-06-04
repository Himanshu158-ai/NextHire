import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#fafafc] font-sans selection:bg-pink-200 overflow-x-hidden flex flex-col">

      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#fff0f0]/60 via-[#ffe3ec]/40 to-[#f4d9fa]/40 pointer-events-none -z-10" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-pink-400/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Navbar */}
     <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-white/70 backdrop-blur-lg border-b border-slate-100">
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-[#1a1a2e] tracking-tight">
          <svg className="w-8 h-8 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" />
          </svg>
          NextHire
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link to="/jobs" className="hover:text-pink-600 transition-colors">Find Jobs</Link>
          <Link to="/about" className="text-pink-600">About Us</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:block text-sm font-bold text-pink-500 hover:text-pink-600 transition-colors px-4 py-2">
            Log In
          </Link>
          <Link to="/signup" className="bg-[#111111] hover:bg-black text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md transition-all hover:-translate-y-0.5 active:scale-95">
            Sign Up
          </Link>
        </div>
      </nav>

      <main className="flex-1 max-w-screen-md mx-auto w-full px-6 py-20 z-10">

        {/* Hero Text */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-pink-100 text-pink-500 text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 inline-block" />
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
            We're making hiring <span className="text-pink-500">simple.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-lg mx-auto">
            NextHire is a job portal built to connect talented people with great companies fast, simple, and without the noise.
          </p>
        </div>

        {/* 3 Simple Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {[
            { emoji: "🎯", title: "Curated Jobs", desc: "Only real, verified listings from genuine companies." },
            { emoji: "⚡", title: "Apply Fast", desc: "One click applications, no endless forms." },
            { emoji: "🤝", title: "For Everyone", desc: "Freshers to seniors NextHire works for all." },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-[2rem] p-7 text-center hover:-translate-y-1 hover:border-pink-100 hover:shadow-[0_15px_40px_-15px_rgba(244,114,182,0.15)] transition-all duration-300">
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="font-extrabold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/jobs">
            <button className="bg-[#111111] hover:bg-black text-white px-10 py-4 rounded-full font-bold text-base transition-all shadow-md hover:-translate-y-0.5 active:scale-95">
              Explore Jobs
            </button>
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-400">
            © {new Date().getFullYear()} NextHire. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;