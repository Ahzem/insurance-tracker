import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/authApi';

interface HeaderProps {
  toggleMobileSidebar: () => void;
  toggleSidebarExpanded?: () => void;
  isSidebarExpanded?: boolean;
}

const Header = ({ toggleMobileSidebar, toggleSidebarExpanded, isSidebarExpanded }: HeaderProps) => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleToggleSidebar = () => {
    if (isMobile) {
      toggleMobileSidebar();
    } else if (toggleSidebarExpanded) {
      toggleSidebarExpanded();
    }
  };

  return (
    <header className="bg-white shadow-sm flex items-center h-16">
      <div className="flex-grow px-4 flex items-center justify-between">
        <button
          onClick={handleToggleSidebar}
          className="text-gray-500 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        <div className="flex-grow"></div>

        <div className="flex items-center">
          <button
            className="text-gray-500 hover:text-gray-900 focus:outline-none"
            aria-label="Notifications"
          >
            <BellIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 