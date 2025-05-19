import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Subcontractors from './pages/Subcontractors';
import NewSubcontractor from './pages/NewSubcontractor';
import SubcontractorDetail from './pages/SubcontractorDetail';
import EditSubcontractor from './pages/EditSubcontractor';
import Login from './pages/Login';
import Register from './pages/Register';
import { isAuthenticated } from './api/authApi';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  useEffect(() => {
    // Check authentication status
    setIsLoggedIn(isAuthenticated());
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const toggleSidebarExpanded = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/" replace /> : <Login />
        } />
        <Route path="/register" element={
          isLoggedIn ? <Navigate to="/" replace /> : <Register />
        } />

        <Route path="/*" element={
          <ProtectedRoute>
            <div className="flex h-screen bg-gray-100 relative">
              {/* Mobile sidebar overlay */}
              {isMobileSidebarOpen && (
                <div 
                  className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 md:hidden"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  aria-hidden="true"
                />
              )}
              
              {/* Sidebar component */}
              <Sidebar 
                isMobileSidebarOpen={isMobileSidebarOpen} 
                closeMobileSidebar={() => setIsMobileSidebarOpen(false)} 
                isExpanded={isSidebarExpanded}
              />
              
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                  toggleMobileSidebar={toggleMobileSidebar} 
                  toggleSidebarExpanded={toggleSidebarExpanded}
                  isSidebarExpanded={isSidebarExpanded}
                />
                <main className="flex-1 overflow-y-auto bg-gray-100">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/subcontractors" element={<Subcontractors />} />
                    <Route path="/subcontractors/new" element={<NewSubcontractor />} />
                    <Route path="/subcontractors/:id" element={<SubcontractorDetail />} />
                    <Route path="/subcontractors/:id/edit" element={<EditSubcontractor />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
