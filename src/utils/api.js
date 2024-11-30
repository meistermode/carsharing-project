import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true  // Важно для работы с Sanctum
});

// Добавляем перехватчик запросов для установки токена
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Перехватчик ответов для обработки ошибок авторизации
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 419)) {
      // Unauthorized или csrf-токен устарел
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('token_expires_at');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const authService = {
    register: async (firstName, lastName, email, password, passwordConfirmation) => {
        try {
            // Сначала получаем CSRF-токен
            await api.get('/sanctum/csrf-cookie');

            const response = await api.post('/api/auth/register', {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                password_confirmation: passwordConfirmation
            });

            const { user, token, token_expires_at } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token_expires_at', token_expires_at);

            return user;
        } catch (error) {
            console.error('Registration error:', error.response?.data);
            throw error;
        }
    },
    login: async (email, password) => {
        try {
            // Сначала получаем CSRF-токен
            await api.get('/sanctum/csrf-cookie');

            const response = await api.post('/api/auth/login', { email, password });
            const { user, token, token_expires_at } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token_expires_at', token_expires_at);

            return user;
        } catch (error) {
            console.error('Login error:', error.response?.data);
            throw error;
        }
    },
    logout: async () => {
        try {
            await api.post('/api/auth/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('token_expires_at');
        } catch (error) {
            console.error('Logout error:', error);
        }
    },
    getProfile: async () => {
        try {
            const response = await api.get('/api/auth/me');
            return response.data;
        } catch (error) {
            console.error('Profile fetch error:', error);
            throw error;
        }
    },
    getTokenExpiration: async () => {
        const expiresAt = localStorage.getItem('token_expires_at');
        return expiresAt ? new Date(expiresAt).getTime() : null;
    }
};

export { api, authService };
