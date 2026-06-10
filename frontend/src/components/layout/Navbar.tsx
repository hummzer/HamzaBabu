import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LogOut, User as UserIcon, Moon, Sun, ShoppingCart, Award, Briefcase, Info, Home, Menu, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Credentials', path: '/certifications', icon: Award },
    { name: 'Shop', path: '/marketplace', icon: ShoppingCart },
  ];

  return (
    <nav className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-earth-tan/20 transition-colors duration-300 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <span className="text-3xl font-black text-earth-rusty tracking-tighter group-hover:scale-105 transition-transform duration-300">NEXUS</span>
              <div className="ml-2 w-2 h-2 rounded-full bg-earth-moss animate-pulse"></div>
            </Link>
            <div className="hidden lg:ml-12 lg:flex lg:space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="inline-flex items-center text-earth-moss dark:text-earth-tan/80 hover:text-earth-rusty dark:hover:text-white px-1 pt-1 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border-b-2 border-transparent hover:border-earth-rusty/50"
                >
                  <item.icon className="h-3 w-3 mr-2 opacity-50" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-6">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl text-earth-moss dark:text-earth-tan hover:bg-earth-cream dark:hover:bg-earth-dark transition-all duration-300 border border-transparent hover:border-earth-tan/20"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            <div className="hidden md:flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4 pl-4 border-l border-earth-tan/20">
                  <Link to="/dashboard" className="flex items-center group">
                    <div className="p-2 rounded-xl bg-earth-cream dark:bg-earth-dark text-earth-rusty border border-earth-tan/10 group-hover:border-earth-rusty/50 transition-all">
                      <UserIcon className="h-5 w-5" />
                    </div>
                    <div className="ml-3 hidden lg:block text-left">
                      <span className="block text-[10px] font-black text-earth-tan uppercase tracking-widest leading-none mb-1">Session Active</span>
                      <span className="block text-xs font-bold text-earth-moss dark:text-earth-tan/80 group-hover:text-earth-rusty transition-colors">{user?.email?.split('@')[0]}</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => { logout(); navigate('/login'); }}
                    className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-2.5 border border-transparent text-[10px] font-black uppercase tracking-[0.2em] rounded-full text-white bg-earth-rusty hover:bg-earth-rusty/90 shadow-lg shadow-earth-rusty/20 hover:shadow-earth-rusty/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FaGithub className="h-4 w-4 mr-2" />
                  Auth Access
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-2xl text-earth-moss dark:text-earth-tan hover:bg-earth-cream dark:hover:bg-earth-dark transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Absolute Overlay) */}
      <div className={`lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-zinc-900 border-b border-earth-tan/20 transition-all duration-300 transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-4 text-earth-moss dark:text-earth-tan/80 hover:text-earth-rusty dark:hover:text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all"
            >
              <item.icon className="h-4 w-4 mr-4 opacity-50" />
              {item.name}
            </Link>
          ))}
          {!isAuthenticated ? (
            <div className="pt-4 mt-4 border-t border-earth-tan/10">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full px-4 py-4 bg-earth-rusty text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl"
              >
                <FaGithub className="h-4 w-4 mr-3" />
                Auth Access
              </Link>
            </div>
          ) : (
            <div className="pt-4 mt-4 border-t border-earth-tan/10 space-y-2">
               <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-4 text-earth-rusty text-xs font-black uppercase tracking-[0.2em] rounded-2xl"
              >
                <UserIcon className="h-4 w-4 mr-4" />
                Dashboard
              </Link>
              <button
                onClick={() => { logout(); navigate('/login'); setIsOpen(false); }}
                className="flex items-center w-full px-4 py-4 text-red-600 text-xs font-black uppercase tracking-[0.2em] rounded-2xl"
              >
                <LogOut className="h-4 w-4 mr-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
