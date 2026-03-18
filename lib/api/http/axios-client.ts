import axios from 'axios';
import { cookies } from 'next/headers';

const BASE_URL = 'http://100.99.105.24:3000';

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

http.interceptors.request.use(async (config) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (error) {
    console.warn('Could not access cookies in axios interceptor', error);
  }
  return config;
});
