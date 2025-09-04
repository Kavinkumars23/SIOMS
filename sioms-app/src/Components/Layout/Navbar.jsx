import { Menu, LogOut, User } from 'lucide-react';
import avatarIcon from '../../assets/avatar.png';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';

const Navbar = ({ onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 sm:px-6 relative">
      {/* Left menu icon */}
      <button className="md:hidden text-gray-700" onClick={onMenuClick}>
        <Menu size={24} />
      </button>

      {/* Center Title */}
      <h2 className="text-xl font-semibold mx-auto md:mx-0">
        <span className="md:hidden">SIOMS</span>
        <span className="hidden md:inline font-bold text-2xl text-[#1e3b8b]">
          Smart Inventory Management System
        </span>
      </h2>

      {/* Avatar and Dropdown */}
      <div className="relative text-sm text-gray-600" ref={dropdownRef}>
        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img
            src={avatarIcon}
            alt="Admin"
            className="w-8 h-8 rounded-full object-cover"
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50">
            <button
              onClick={() => {
                setDropdownOpen(false);
                navigate('/profile');
              }}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left text-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
