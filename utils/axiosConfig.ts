import axios from 'axios';
import {API_URL} from '../config';
import {store} from '../store';
import {refreshToken} from '../store/slices/authSlice';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Skip refresh token for auth endpoints
                if (
                    originalRequest.url.includes('/auth/login') ||
                    originalRequest.url.includes('/auth/register')
                ) {
                    return Promise.reject(error);
                }

                await store.dispatch(refreshToken()).unwrap();
                const newToken = store.getState().auth.token;

                if (newToken) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;