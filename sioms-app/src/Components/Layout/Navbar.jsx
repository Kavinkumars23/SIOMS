import { Menu } from 'lucide-react';
import avatarIcon from '../../assets/avatar.png'; // You can use any icon

const Navbar = ({ onMenuClick }) => {
  return (
    <div className="w-full h-16 bg-white border-b shadow-sm flex items-center md:justify-end justify-between px-4 sm:px-6">
      {/* Left menu icon */}
      <button className="md:hidden text-gray-700" onClick={onMenuClick}>
        <Menu size={24} />
      </button>

      {/* Center logo text */}
      <h2 className="text-xl font-semibold mx-auto md:mx-0 md:hidden">SIOMS</h2>
      
      {/* Right avatar */}
      <div className="text-sm text-gray-600">
        <img src={avatarIcon} alt="Admin" className="w-8 h-8 rounded-full object-cover" />
      </div>
    </div>
  );
};

export default Navbar;
