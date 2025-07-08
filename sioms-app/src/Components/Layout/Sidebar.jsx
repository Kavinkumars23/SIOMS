import {
  Home,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Boxes,
  ClipboardList,
} from 'lucide-react';
import { useEffect } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Sidebar = ({ expanded, onToggle, onClose, isMobile }) => {
  useEffect(() => {
    // Close sidebar when resizing back to desktop
    if (!isMobile && expanded) {
      onToggle(true);
    }
  }, [isMobile]);

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && expanded && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div
  className={`
    h-screen bg-blue-900 text-white flex flex-col justify-between fixed top-0 left-0 z-50 transition-all duration-300
    ${isMobile ? (expanded ? 'w-64' : 'hidden') : expanded ? 'w-64' : 'w-20'}
  `}
>

        <div className="flex flex-col p-4">
          {/* Logo and toggle button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
              {expanded && <h1 className="text-xl font-bold">SIOMS</h1>}
            </div>
            <button
              onClick={() => onToggle(!expanded)}
              className="text-white focus:outline-none"
            >
              {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>

          {/* Menu Items */}
          <ul className="space-y-6">
  <li className="flex items-center gap-3 hover:text-blue-300 cursor-pointer">
    <Link to="/landing" className="flex items-center gap-3">
    <Home size={20} /> {expanded && <span>Home</span>}
    </Link>
  </li>
  <li className="flex items-center gap-3 hover:text-blue-300 cursor-pointer">
  <Link to="/products" className="flex items-center gap-3">
    <Briefcase size={20} />
    {expanded && <span>Products</span>}
  </Link>
</li>

  <li className="flex items-center gap-3 hover:text-blue-300 cursor-pointer">
    <Boxes size={20} /> {expanded && <span>Inventory</span>}
  </li>
  <li className="flex items-center gap-3 hover:text-blue-300 cursor-pointer">
    <ClipboardList size={20} /> {expanded && <span>Orders</span>}
  </li>
</ul>
        </div>

        {/* Footer */}
        {expanded && (
          <div className="text-xs text-center p-2">
            © 2025 SIOMS. All rights reserved.
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
