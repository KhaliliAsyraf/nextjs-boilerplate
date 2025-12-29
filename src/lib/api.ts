import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

// Create axios instance
const api = axios.create({
    baseURL: '/api', // Proxied by Next.js rewrites
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Logout if 401
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

export default api;
