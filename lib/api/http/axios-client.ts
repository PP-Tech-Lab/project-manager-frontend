import axios from 'axios';

const BASE_URL = 'http://100.99.105.24:4000';

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

// Aquí podríamos agregar interceptores para token, logging, etc.
// http.interceptors.request.use((config) => {
//   // Ejemplo: adjuntar token si existiera
//   // const token = localStorage.getItem('token');
//   // if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
//});
