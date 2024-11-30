import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../utils/api';
import { motion } from 'framer-motion';
import { 
    FaUser, 
    FaEnvelope, 
    FaLock, 
    FaUserPlus 
} from 'react-icons/fa';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (password !== passwordConfirmation) {
            setError('Пароли не совпадают');
            setIsLoading(false);
            return;
        }

        try {
            const user = await authService.register(
                firstName, 
                lastName, 
                email, 
                password, 
                passwordConfirmation
            );
            
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
            const errorMessage = err.response?.data?.message || 'Ошибка регистрации';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8 transition-colors duration-200">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700"
            >
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Регистрация
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Создайте ваш аккаунт
                    </p>
                </div>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <form className="space-y-6" onSubmit={handleRegister}>
                    <div className="space-y-4">
                        <div className="flex space-x-4">
                            <div className="relative w-1/2">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400 dark:text-gray-500" />
                                </div>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="pl-10 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Имя"
                                />
                            </div>
                            <div className="relative w-1/2">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400 dark:text-gray-500" />
                                </div>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="pl-10 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Фамилия"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-gray-400 dark:text-gray-500" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Email"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400 dark:text-gray-500" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Пароль"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400 dark:text-gray-500" />
                            </div>
                            <input
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                type="password"
                                required
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                className="pl-10 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Подтвердите пароль"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
                        >
                            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Уже есть аккаунт?{' '}
                        <Link 
                            to="/login" 
                            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors"
                        >
                            Войдите
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
