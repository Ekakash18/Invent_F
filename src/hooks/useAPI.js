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
    config.headers['x-api-key'] = API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default useAPI;
