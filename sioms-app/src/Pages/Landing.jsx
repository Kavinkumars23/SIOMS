import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to SIOMS</h1>
        <p className="text-lg mb-8">Smart Inventory & Order Management System</p>
        <div className="space-x-4">
          <Link to="/login" className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded shadow hover:bg-indigo-100 transition">
            Login
          </Link>
          <Link to="/register" className="px-6 py-3 border border-white text-white font-semibold rounded hover:bg-white hover:text-indigo-700 transition">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
