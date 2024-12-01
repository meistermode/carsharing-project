import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import '../styles/auth-forms.css';
import AnimatedCircles from '../components/AnimatedCircles';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = await login(email, password);
            
            // Редирект в зависимости от роли
            switch (user.role) {
                case 'admin':
                    navigate('/admin/dashboard');
                    break;
                case 'driver':
                    navigate('/driver/dashboard');
                    break;
                default:
                    navigate('/profile');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Ошибка входа';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent px-4 py-8 transition-colors duration-200">
            <AnimatedCircles />
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-md w-full space-y-8 p-8 glass-container"
            >
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Вход</h2>
                    <p className="text-gray-600 dark:text-gray-300">Войдите в свой аккаунт</p>
                </div>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="relative">
                            <div className="icon-container">
                                <FaEnvelope className="input-icon" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="glass-input w-full pl-10 pr-3 py-2 text-sm"
                                placeholder="Email"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Пароль</label>
                        <div className="relative">
                            <div className="icon-container">
                                <FaLock className="input-icon" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="glass-input w-full pl-10 pr-3 py-2 text-sm"
                                placeholder="Пароль"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-white">
                                Запомнить меня
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                                Забыли пароль?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="glass-button w-full flex justify-center py-2 px-4 text-sm font-medium"
                        >
                            {isLoading ? 'Загрузка...' : (
                                <>
                                    <FaSignInAlt className="mr-2 my-auto" />
                                    Войти
                                </>
                            )}
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Нет аккаунта? {' '}
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                                Зарегистрируйтесь
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
