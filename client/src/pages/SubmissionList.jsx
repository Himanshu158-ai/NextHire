import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config/api'
import { toast } from 'react-toastify'

const SubmissionList = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/apply/${id}`)
                setList(res.data.submissions)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchSubmissions()
    }, [id])

    const handleAccept = async (submissionId) => {
        try {
            const res = await axios.put(`${API_URL}/api/apply/${submissionId}`)
            toast.success(res.data.message)
            setList((prev) =>
                prev.map((item) =>
                    item._id === submissionId ? { ...item, status: 'shortlisted' } : item
                )
            )
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleReject = async (submissionId) => {
        try {
            const res = await axios.delete(`${API_URL}/api/apply/${submissionId}`)
            toast.success(res.data.message)
            setList((prev) => prev.filter((item) => item._id !== submissionId))
        } catch (error) {
            toast.error(error.message)
        }
    }

    // ── Loading ──────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#fff0f0] via-[#ffe3ec] to-[#f4d9fa] flex flex-col items-center justify-center font-sans">
                <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Loading submissions...</p>
            </div>
        )
    }

    // ── Main ─────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#fafafc] font-sans overflow-x-hidden relative flex flex-col">

            {/* Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-[#fff0f0]/80 via-[#ffe3ec]/60 to-[#f4d9fa]/60 pointer-events-none -z-10" />
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-pink-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />

            {/* Navbar */}
            <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 max-w-screen-2xl mx-auto w-full">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-2xl font-extrabold text-[#1a1a2e] tracking-tight"
                >
                    <svg className="w-8 h-8 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" />
                    </svg>
                    NextHire
                </Link>
                <Link to="/profile">
                    <button className="text-sm font-bold text-slate-500 hover:text-pink-600 transition-colors">
                        ← Back to Profile
                    </button>
                </Link>
            </nav>

            {/* Page Content */}
            <main className="flex-1 max-w-screen-md mx-auto w-full px-6 py-10 z-10">

                {/* Page Header */}
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
                        Submissions
                    </h1>
                    <p className="text-slate-500 text-lg">
                        Review all applicants for this position.
                    </p>
                    {list.length > 0 && (
                        <span className="inline-flex items-center gap-2 mt-3 bg-pink-50 border border-pink-100 text-pink-500 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 inline-block" />
                            {list.length} Applicant{list.length > 1 ? 's' : ''}
                        </span>
                    )}
                </div>

                {/* Empty State */}
                {list.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <p className="text-5xl mb-4">🙌</p>
                        <h2 className="text-2xl font-extrabold text-slate-800 mb-2">
                            No submissions yet
                        </h2>
                        <p className="text-slate-500 font-medium">
                            Check back later once candidates start applying.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {list.map((item, index) => {
                            const isShortlisted = item?.status === 'shortlisted'
                            const isFeatured = index === 0

                            // Avatar color based on name
                            const colors = [
                                'from-pink-200 to-purple-400',
                                'from-blue-200 to-cyan-400',
                                'from-green-200 to-emerald-400',
                                'from-orange-200 to-rose-400',
                            ]
                            const avatarGradient = colors[index % colors.length]

                            return (
                                <div
                                    key={item._id}
                                    className={`flex flex-col bg-white rounded-[2rem] overflow-hidden ${isFeatured
                                        ? 'shadow-[0_15px_40px_-15px_rgba(244,114,182,0.3)] border-2 border-pink-100'
                                        : 'shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-100/80'
                                        }`}
                                >
                                    <div className="p-8">
                                        <div className="flex items-start justify-between gap-6 flex-col md:flex-row">

                                            {/* Left: Avatar + Info */}
                                            <div className="flex items-start gap-4 flex-1 min-w-0">
                                                {/* Avatar */}
                                                <div
                                                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${avatarGradient} text-white flex items-center justify-center text-2xl font-extrabold shadow-md flex-shrink-0`}
                                                >
                                                    {item?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                                </div>

                                                {/* Details */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                                                        {item?.user?.name}
                                                    </h3>
                                                    <p className="text-sm text-slate-400 font-semibold flex items-center gap-1.5 mb-4">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                        {/* <a href="#" className="hover:underline">{item?.user?.website}</a> */}
                                                        {item?.user?.email}
                                                    </p>

                                                    {/* Skills */}
                                                    {item?.user?.skills?.length > 0 && (
                                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                                            {item.user.skills.slice(0, 5).map((skill, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="bg-white border border-slate-200 text-slate-600 font-bold px-2.5 py-1 rounded-xl text-[11px] shadow-sm"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                            {item.user.skills.length > 5 && (
                                                                <span className="bg-slate-100 text-slate-400 font-bold px-2.5 py-1 rounded-xl text-[11px]">
                                                                    +{item.user.skills.length - 5}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Education */}
                                                    {item?.user?.education && (
                                                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-3">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                                            </svg>
                                                            {item.user.education}
                                                        </div>
                                                    )}

                                                    {/* Status Badge */}
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-full border ${isShortlisted
                                                            ? 'bg-green-50 text-green-600 border-green-200'
                                                            : 'bg-amber-50 text-amber-600 border-amber-200'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`w-1.5 h-1.5 rounded-full ${isShortlisted ? 'bg-green-500' : 'bg-amber-500'
                                                                }`}
                                                        />
                                                        {isShortlisted ? 'Shortlisted' : 'Pending'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Right: Action Buttons */}
                                            <div className="flex flex-col gap-3 flex-shrink-0 sm:w-auto w-full">
                                                <button
                                                    onClick={() => handleAccept(item._id)}
                                                    className="bg-[#111111] hover:bg-black text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md hover:-translate-y-0.5 active:scale-95"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleReject(item._id)}
                                                    className="bg-white hover:bg-red-50 text-red-500 border border-red-200 px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5 active:scale-95"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div
                                        className={`py-3.5 px-8 text-xs font-extrabold tracking-widest uppercase flex justify-between items-center ${isFeatured
                                            ? 'bg-pink-50 text-pink-400 border-t border-pink-100'
                                            : 'bg-slate-50 text-slate-400 border-t border-slate-100'
                                            }`}
                                    >
                                        <span>Applied {index === 0 ? 'Yesterday' : `${index + 2} days ago`}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="py-6 mt-auto border-t border-slate-100 bg-white/50 backdrop-blur-sm z-10">
                <div className="max-w-screen-xl mx-auto px-6 text-center">
                    <p className="text-sm font-semibold text-slate-400">
                        © {new Date().getFullYear()} NextHire. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default SubmissionList