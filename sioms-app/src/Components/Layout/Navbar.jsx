import { Menu } from 'lucide-react';
import avatarIcon from '../../assets/avatar.png'; // You can use any icon

const Navbar = ({ onMenuClick }) => {
  return (
    <div className="w-full h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 sm:px-6">
      {/* Left menu icon - visible on mobile only */}
      <button className="md:hidden text-gray-700" onClick={onMenuClick}>
        <Menu size={24} />
      </button>

      {/* Center Title: SIOMS for small screens, Full title for medium and up */}
      <h2 className="text-xl font-semibold mx-auto md:mx-0">
        <span className="md:hidden">SIOMS</span>
        <span className="hidden md:inline font-bold text-2xl text-[#1e3b8b]">Smart Inventory Management System</span>
      </h2>

      {/* Right avatar */}
      <div className="text-sm text-gray-600">
        <img src={avatarIcon} alt="Admin" className="w-8 h-8 rounded-full object-cover" />
      </div>
    </div>
  );
};

export default Navbar;
