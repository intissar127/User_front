import axios from 'axios';
import { getValidToken } from './auth';
const api = axios.create({
    baseURL: 'http://localhost:8081/api/users',
});

api.interceptors.request.use(async (config) => {
    const token = await getValidToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const registerUser = (userData) => {
    const { role } = userData;
    
    if (role === 'STUDENT') return api.post('/students', userData);
    if (role === 'TEACHER') return api.post('/teachers', userData);
    if (role === 'ADMIN') return api.post('/admin', userData);
};

export const loginUser = (credentials) => {
    return api.post('/login', credentials);
};