import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import { API_URL } from "../config/api";

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const nevigate = useNavigate();

  async function send(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userID", res.data.user._id);
        localStorage.setItem("userLogo", JSON.stringify({ name: res.data.user.name }));
        localStorage.setItem("userRole", res.data.user.role);
        nevigate('/jobs');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafc] font-sans selection:bg-pink-200 flex flex-col overflow-x-hidden relative">

      {/* Background Gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#fff0f0]/60 via-[#ffe3ec]/40 to-[#f4d9fa]/40 pointer-events-none -z-10" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-pink-400/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 px-4 sm:px-6 md:px-12 py-4 sm:py-5 bg-white/70 backdrop-blur-lg border-b border-slate-100">

        <Link
          to="/"
          className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold text-[#1a1a2e] tracking-tight"
        >
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" />
          </svg>
          NextHire
        </Link>

        <Link
          to="/signup"
          className="text-center text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
        >
          Don't have an account?
          <span className="text-pink-500 hover:text-pink-600 font-bold ml-1">
            Sign Up
          </span>
        </Link>

      </nav>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center px-4 py-16 relative z-10">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_60px_-20px_rgba(244,114,182,0.15)] px-8 py-10">

            {/* Heading */}
            <div className="text-center mb-8">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-400 flex items-center justify-center mx-auto mb-5 shadow-md shadow-pink-100">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Welcome Back
              </h2>
              <p className="text-slate-400 text-sm font-medium">
                Log in to continue your journey with NextHire.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={send}>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-[#fafafc] border border-slate-200 text-slate-800 placeholder-slate-400 px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-300/50 focus:border-pink-300 transition-all"
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-[#fafafc] border border-slate-200 text-slate-800 placeholder-slate-400 px-4 py-3 pr-12 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-300/50 focus:border-pink-300 transition-all"
                    onChange={(e) => setpassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-pink-400 focus:outline-none p-1 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-700 transition-colors font-medium">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-pink-500 focus:ring-pink-300"
                  />
                  Remember me
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#111111] hover:bg-black text-white py-3.5 rounded-full text-base font-bold transition-all shadow-md hover:-translate-y-0.5 active:scale-95 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>

          {/* Below card link */}
          <p className="text-center text-sm text-slate-400 font-medium mt-6">
            New to NextHire?{" "}
            <Link to="/signup" className="text-pink-500 font-bold hover:text-pink-600 transition-colors">
              Create a free account
            </Link>
          </p>
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

export default Login;