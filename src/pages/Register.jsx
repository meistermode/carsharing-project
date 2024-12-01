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
import '../styles/auth-forms.css';
import AnimatedCircles from '../components/AnimatedCircles';

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
        <div className="min-h-screen flex items-center justify-center bg-transparent px-4 py-8 transition-colors duration-200">
            <AnimatedCircles />
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-md w-full space-y-8 p-8 glass-container"
            >
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Регистрация</h2>
                    <p className="text-gray-600 dark:text-gray-300">Создайте свой аккаунт</p>
                </div>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="firstName" className="sr-only">Имя</label>
                            <div className="relative">
                                <div className="icon-container">
                                    <FaUser className="input-icon" />
                                </div>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="glass-input w-full pl-10 pr-3 py-2 text-sm"
                                    placeholder="Имя"
                                />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="lastName" className="sr-only">Фамилия</label>
                            <div className="relative">
                                <div className="icon-container">
                                    <FaUser className="input-icon" />
                                </div>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="glass-input w-full pl-10 pr-3 py-2 text-sm"
                                    placeholder="Фамилия"
                                />
                            </div>
                        </div>
                    </div>

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

                    <div>
                        <label htmlFor="passwordConfirmation" className="sr-only">Подтверждение пароля</label>
                        <div className="relative">
                            <div className="icon-container">
                                <FaLock className="input-icon" />
                            </div>
                            <input
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                type="password"
                                required
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                className="glass-input w-full pl-10 pr-3 py-2 text-sm"
                                placeholder="Подтвердите пароль"
                            />
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
                                    <FaUserPlus className="mr-2 my-auto" />
                                    Зарегистрироваться
                                </>
                            )}
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Уже есть аккаунт? {' '}
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                                Войдите
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Register;
