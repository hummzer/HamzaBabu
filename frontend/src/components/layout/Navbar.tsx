import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">NEXUS</span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 px-1 pt-1 text-sm font-medium">Home</Link>
              <Link to="/projects" className="text-gray-600 hover:text-gray-900 px-1 pt-1 text-sm font-medium">Projects</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 px-1 pt-1 text-sm font-medium">About</Link>
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
                  <UserIcon className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium hidden md:inline">{user?.email}</span>
                </Link>
                <button
                  onClick={() => { logout(); navigate('/login'); }}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors"
              >
                <FaGithub className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
