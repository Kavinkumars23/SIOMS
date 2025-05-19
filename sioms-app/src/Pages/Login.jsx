import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../Services/api';
import loginImage from '../assets/login_Side_img.jpg';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();         
        try {
            const res = await api.post('/auth/login', form);
            console.log('Login success:', res.data);
            localStorage.setItem('token', res.data.token);
            navigate('/landing');

        } catch (err) {
            console.error('Login failed:', err.response?.data || err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300">
            <div className="flex w-full max-w-5xl bg-white shadow-xl rounded-lg overflow-hidden">

                {/* Left Section */}
                <div className="hidden md:flex w-1/2 bg-white items-center justify-center p-6">
                    <img src={loginImage} alt="Illustration" className="w-3/4" />
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-3xl font-bold text-gray-800">Welcome to SIOMS!</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">Login to your account</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        <input
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition"
                        >
                            Login
                        </button>
                        <div className="flex items-center justify-center mt-6">
                            <span className="text-gray-500 text-sm mr-2">or</span>
                            <Link
                                to="/register"
                                className="text-purple-600 hover:underline font-semibold text-sm"
                            >
                                Create an account
                            </Link>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;
