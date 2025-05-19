import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, XMarkIcon, UserGroupIcon, ArrowLeftOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { logout, getCurrentUser } from '../../api/authApi';

interface SidebarItem {
  path: string;
  icon: React.ReactNode;
  title: string;
}

interface SidebarProps {
  isMobileSidebarOpen: boolean;
  closeMobileSidebar: () => void;
  isExpanded: boolean;
}

// Create a SidebarItem component for better organization
const SidebarItem = ({ 
  item, 
  isExpanded, 
  closeMobileMenu 
}: { 
  item: SidebarItem; 
  isExpanded: boolean; 
  closeMobileMenu: () => void;
}) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const isMobile = window.innerWidth < 768;
  
  return (
    <li className="mb-2 flex justify-center md:justify-start">
      <Link
        to={item.path}
        className={`
          flex items-center p-3 text-gray-300 hover:bg-gray-700 
          rounded-lg transition-colors relative group
          ${isActive ? 'bg-gray-700 text-white' : ''}
          ${!isExpanded && !isMobile ? 'justify-center w-10' : 'w-full'}
        `}
        onClick={() => isMobile && closeMobileMenu()}
      >
        <div className="flex-shrink-0">
          {item.icon}
        </div>
        {/* Show tooltip only in collapsed state on desktop */}
        {!isExpanded && !isMobile && (
          <span className="
            absolute left-full ml-2 bg-gray-900 text-white text-xs rounded py-1 px-2
            whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none
            transition-opacity duration-200 z-50 hidden md:block
          ">
            {item.title}
          </span>
        )}
        {(isExpanded || isMobile) && (
          <span className="ml-3 whitespace-nowrap overflow-hidden text-ellipsis">
            {item.title}
          </span>
        )}
      </Link>
    </li>
  );
};

const Sidebar = ({ isMobileSidebarOpen, closeMobileSidebar, isExpanded }: SidebarProps) => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;
  const user = getCurrentUser();
  
  const handleSignOut = () => {
    logout();
    navigate('/login');
    if (isMobile) {
      closeMobileSidebar();
    }
  };
  
  const sidebarItems: SidebarItem[] = [
    {
      path: '/',
      icon: <HomeIcon className="h-6 w-6" />,
      title: 'Dashboard',
    },
    {
      path: '/subcontractors',
      icon: <UserGroupIcon className="h-6 w-6" />,
      title: 'Sub Contractors',
    }
  ];

  return (
    <div className="h-screen relative">
      <aside 
        className={`
          fixed md:relative inset-y-0 left-0 z-30
          md:translate-x-0 transform ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-all duration-300 ease-in-out
          ${isExpanded ? 'md:w-64' : 'md:w-16'} 
          bg-gray-800 text-white md:flex flex-col h-screen
          overflow-hidden
        `}
        aria-label="Sidebar"
      >
        {/* Mobile Close Button Container */}
        <div className="flex items-center justify-between p-4 md:hidden border-b border-gray-700">
          <h2 className="text-xl font-bold">BB</h2>
          <button
            className="text-gray-300 hover:text-white p-1 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
            onClick={closeMobileSidebar}
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Header */}
        <div className={`
          hidden md:flex items-center justify-center h-16 border-b border-gray-700
          ${isExpanded ? 'px-4' : 'px-0'}
        `}>
          {isExpanded && (
            <h1 className="text-xl font-bold truncate w-full text-center">
              BB
            </h1>
          )}
        </div>

        <nav className={`
          mt-6 flex-1 overflow-y-auto overflow-x-hidden
          ${isExpanded ? 'px-4' : 'px-3'}
        `} aria-label="Main navigation">
          <ul className="w-full">
            {sidebarItems.map((item, index) => (
              <SidebarItem 
                key={index} 
                item={item} 
                isExpanded={isExpanded} 
                closeMobileMenu={closeMobileSidebar} 
              />
            ))}
          </ul>
        </nav>
        
        {/* User Profile Section */}
        <div className={`
          border-t border-gray-700 py-3
          ${isExpanded ? 'px-4' : 'px-3'}
        `}>
          <div className={`
            flex items-center p-2 text-gray-200 rounded-lg
            ${!isExpanded && !isMobile ? 'justify-center' : ''}
          `}>
            <div className="flex-shrink-0">
              <UserCircleIcon className="h-8 w-8 text-gray-300" />
            </div>
            
            {/* Show tooltip only in collapsed state on desktop */}
            {!isExpanded && !isMobile && (
              <span className="
                absolute left-full ml-2 bg-gray-900 text-white text-xs rounded py-1 px-2
                whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none
                transition-opacity duration-200 z-50 hidden md:block
              ">
                {user?.name || 'User'}
              </span>
            )}
            
            {(isExpanded || isMobile) && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email || ''}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Sign Out Button */}
        <div className={`
          border-t border-gray-700 py-3
          ${isExpanded ? 'px-4' : 'px-3'}
        `}>
          <button
            onClick={handleSignOut}
            className={`
              flex items-center p-3 text-red-400 hover:bg-gray-700 hover:text-red-300
              rounded-lg transition-colors w-full
              ${!isExpanded && !isMobile ? 'justify-center' : ''}
            `}
            aria-label="Sign out"
          >
            <div className="flex-shrink-0">
              <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            </div>
            
            {/* Show tooltip only in collapsed state on desktop */}
            {!isExpanded && !isMobile && (
              <span className="
                absolute left-full ml-2 bg-gray-900 text-white text-xs rounded py-1 px-2
                whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none
                transition-opacity duration-200 z-50 hidden md:block
              ">
                Sign Out
              </span>
            )}
            
            {(isExpanded || isMobile) && (
              <span className="ml-3 whitespace-nowrap font-medium">
                Sign Out
              </span>
            )}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar; 