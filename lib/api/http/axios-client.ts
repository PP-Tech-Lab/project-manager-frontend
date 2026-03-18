import axios from 'axios';

const BASE_URL = 'http://100.99.105.24:3000';

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});
