import useAuthStore from '@/store/AuthStore';
import { API_KEY } from '@/utils/constants';
import axios from 'axios';

const useAPI = axios.create({
    baseURL: 'https://invent-b.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

useAPI.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['x-api-key'] = 'bd0d6fc93d5eef504c4a0437cd7b97ed23d0043fbe2a3e6c303cef26fbbe49ac';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default useAPI;
