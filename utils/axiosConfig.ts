import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '../config';
import {store} from '../store/store';
import {logout, refreshToken} from '../store/slices/authSlice';
import {clearSymptoms} from '../store/slices/symptomSlice';
/**
 * @file: axiosConfig.ts
 * @description: The axios configuration file. Contains the axios instance with interceptors.
 * @requires SecureStore To store the token securely on the device storage.
 * @function processQueue To process the queue of requests that were waiting for the token refresh.
 * @exports axiosInstance
 */
const axiosInstance = axios.create({
    baseURL: API_URL,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Add exclusion for auth endpoints
        const isAuthRequest = originalRequest.url.includes('/auth/login') ||
            originalRequest.url.includes('/auth/register');

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
            if (originalRequest.url.includes('/auth/refresh')) {
                await SecureStore.deleteItemAsync('token');
                store.dispatch(logout());
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Clear symptom history to prevent duplicate keys issues
                store.dispatch(clearSymptoms());

                await store.dispatch(refreshToken()).unwrap();
                const newToken = store.getState().auth.token;

                if (newToken) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    processQueue(null, newToken);
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                processQueue(refreshError, null);
                await SecureStore.deleteItemAsync('token');
                store.dispatch(logout());
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;