import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsOpen(false);
  };

  const menuItems = [
    { to: "/", label: "Главная" },
    { to: "/cars", label: "Автомобили" },
    { to: "/tariffs", label: "Тарифы" },
    { to: "/about", label: "О сервисе" }
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-100 dark:bg-gray-800 shadow-none transition-shadow"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center mr-6">
              <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-2">
                <div className="relative w-12 h-12">
                  <img 
                    src="/images/logo/logo.svg" 
                    alt="CarSharing Logo" 
                    className="absolute inset-0 w-full h-full dark:hidden" 
                  />
                  <img 
                    src="/images/logo/logo-dark.svg" 
                    alt="CarSharing Logo" 
                    className="absolute inset-0 w-full h-full hidden dark:block" 
                  />
                </div>
                <span>CarSharing</span>
              </Link>
            </div>
            <div className="hidden sm:flex sm:space-x-8">
              {menuItems.map((item) => (
                <Link 
                  key={item.to}
                  to={item.to} 
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden sm:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/profile" 
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2">
                      {user?.avatar ? (
                        <img 
                          src={`/storage/${user.avatar}`} 
                          alt="User Avatar" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                          {user?.first_name?.[0].toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium">{user?.first_name}</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-sm text-red-500 hover:text-red-600 font-medium"
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link 
                    to="/login" 
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Войти
                  </Link>
                  <Link 
                    to="/register" 
                    className="text-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 px-3 py-2 rounded-md font-medium"
                  >
                    Регистрация
                  </Link>
                </div>
              )}
            </div>

            {/* Мобильное меню - кнопка */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 flex items-center justify-center"
              >
                {!isOpen ? (
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильное выезжающее меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {user?.avatar ? (
                      <div className="flex items-center">
                        <img 
                          src={`/storage/${user.avatar}`} 
                          alt="User Avatar" 
                          className="w-8 h-8 object-cover rounded-full mr-2"
                        />
                        Профиль ({user?.first_name})
                      </div>
                    ) : (
                      `Профиль (${user?.first_name})`
                    )}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-500 hover:text-red-600 px-3 py-2 text-base font-medium"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Войти
                  </Link>
                  <Link
                    to="/register"
                    className="block bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
