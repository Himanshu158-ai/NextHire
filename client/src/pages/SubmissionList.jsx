import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from '../config/api';
import { toast } from 'react-toastify';

const SubmissionList = () => {
    const { id } = useParams();
    const [loading, setloading] = useState("true");

    const [list, setlist] = useState([]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/apply/${id}`);
                setlist(res.data.submissions);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setloading(false);
            }
        };
        fetchSubmissions();
    }, []);

    const handleAccept = async (id) => {
        try{
            const res = await axios.put(`${API_URL}/api/apply/${id}`);
            toast.success(res.data.message);
        }catch(error){
            toast.error(error.message);
        }
    }
    const handleReject = async (id) => {
        try{
            const res = await axios.delete(`${API_URL}/api/apply/${id}`);
            toast.success(res.data.message);
        }catch(error){
            toast.error(error.message);
        }
    }

    if (loading === "false") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div>
            <h1 className='text-2xl font-bold text-center text-blue-600 pt-6'>Submissions</h1>
            {
                list.length>0?(
                list.map((item, idx) => (
                    <div key={idx} className='border border-gray-200 rounded-lg p-4 mt-8'>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className='font-bold text-gray-700'>{item?.user?.name}</p>
                                <p className=' font-bold text-gray-700 '>{item?.user?.email}</p>
                                <p className='text-gray-600 capitalize'>Skills: <span className='text-gray-700'>{item?.user?.skills.length>0?item?.user?.skills.map((skill, idx) => <span key={idx}>{skill}, </span>):"No skills"}</span>
                                </p>
                                <p className='text-gray-600 capitalize'>Education: <span className='text-gray-700'>{item?.user?.education?item?.user?.education:"No education"}</span></p>
                                <p className={`text-gray-600 capitalize font-semibold ${item?.status === "shortlisted" ? "text-green-600" : "text-red-400"}`}>Status: {item?.status}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className='bg-green-500 text-white px-4 py-2 rounded-lg' onClick={() => handleAccept(item._id)}>Accept</button>
                                <button className='bg-red-500 text-white px-4 py-2 rounded-lg' onClick={() => handleReject(item._id)}>Reject</button>
                            </div>
                        </div>
                    </div>
                ))
            ):(
                <p className='text-center text-gray-600 mt-8 text-3xl font-bold'>No submissions yet🙌</p>
            )
            }
        </div>
    )
}

export default SubmissionList