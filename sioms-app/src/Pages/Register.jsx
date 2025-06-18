import React, { useState } from 'react';
import api from '../Services/api';
import loginImage from '../assets/login_Side_img.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../features/auth/authApi';



const Register = () => {
    const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'admin' });
    const [register, {isLoading}] = useRegisterMutation(); 
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(form).unwrap();
            console.log('Register success:', res.data);
            navigate("/login")
        } catch (err) {
            console.error('Register failed:', err.response?.data || err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300">
            <div className="bg-white rounded-xl shadow-lg flex max-w-5xl w-full overflow-hidden">
                <div className="hidden md:flex w-1/2 bg-white items-center justify-center p-8">
                    <img
                        src={loginImage}
                        alt="Illustration"
                        className="w-3/4"
                    />
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Welcome to SIOMS</h2>
                    </div>
                    <p className="text-gray-500 text-sm mb-6">Register your account</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition"
                        >
                            Register
                        </button>
                        {/* Add below your register button */}
                        <div className="flex items-center justify-center mt-6">
                            <span className="text-gray-500 text-sm mr-2">or</span>
                            <Link
                                to="/login"
                                className="text-purple-600 hover:underline font-semibold text-sm"
                            >
                                Already have an account? Login
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
