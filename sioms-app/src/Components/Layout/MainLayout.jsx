import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuToggle = () => setIsSidebarExpanded(true);
  const handleSidebarToggle = () => setIsSidebarExpanded(prev => !prev);
  const handleSidebarClose = () => setIsSidebarExpanded(false);

  return (
    <div className="flex">
      <Sidebar
        expanded={isSidebarExpanded}
        onToggle={handleSidebarToggle}
        onClose={handleSidebarClose}
        isMobile={isMobile}
      />
      <div
        className={`flex-1 min-h-screen bg-gray-100 transition-all duration-300 
          ${isMobile ? 'ml-0' : isSidebarExpanded ? 'ml-64' : 'ml-20'}
        `}
      >
        <Navbar onMenuClick={handleMenuToggle} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
