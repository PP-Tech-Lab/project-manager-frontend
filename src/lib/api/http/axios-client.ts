import axios from 'axios';
import { cookies } from 'next/headers';
import { ApiErrors } from '@/lib/api/enums/api-errors.enum';

const BASE_URL = process.env.API_URL;

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
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

http.interceptors.response.use(
  response => response,
  (error) => {
    console.log('\nMethod:', error.config?.method);
    console.log('URL:', error.config?.url);
    console.log('Code:', error.code, '\n');

    let apiError: ApiErrors = ApiErrors.UNKNOWN;

    if (error.response) {
      const status = error.response.status;
      if (status === 400) apiError = ApiErrors.BAD_REQUEST;
      if (status === 401) apiError = ApiErrors.UNAUTHORIZED;  //Todo Include logic to clean cookies and redirect to login page
    } else if (error.request) {
      apiError = ApiErrors.REQUEST_TIMEOUT;
    }

    return Promise.reject(apiError);
  }
);
