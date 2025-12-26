import axios from 'axios';

const API_BASE = 'https://excited-lori-farhansadik-d2cb758b.koyeb.app/api/auth';

const instance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// -------------------- AUTH APIs -------------------- //

export const register = (formData) =>
  instance.post('/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const login = (credentials) => instance.post('/login', credentials);

export const getProfile = () => instance.get('/profile');

export const getAllUsers = () => instance.get('/all-users');

export const logout = () => instance.post('/logout');

export const updateProfile = (formData) => instance.put('/profile', formData);
