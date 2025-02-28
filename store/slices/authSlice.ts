import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '../../config';
/**
 * @file: authSlice.ts
 * @description: The redux slice for authentication related actions.
 * @thunks: login, register, refreshToken, logout
 * @reducer: clearRegistrationSuccess
 * @exports authSlice
 */
interface AuthState {
    user: any | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    registrationSuccess: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    registrationSuccess: false,
};

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}: { email: string; password: string }) => {
        const response = await axiosInstance.post(`${API_URL}/auth/login`, {
            email,
            password,
        });
        await SecureStore.setItemAsync('token', response.data.data.accessToken);
        return response.data;
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async ({email, password, name}: { email: string; password: string; name: string }) => {
        const response = await axiosInstance.post(`${API_URL}/auth/register`, {
            email,
            password,
            name,
        });
        return response.data;
    }
);

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async () => {
        const response = await axiosInstance.post(`${API_URL}/auth/refresh`);
        await SecureStore.setItemAsync('token', response.data.data.accessToken);
        return response.data;
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await axiosInstance.post(`${API_URL}/auth/logout`);
        await SecureStore.deleteItemAsync('token');
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearRegistrationSuccess: (state) => {
            state.registrationSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.token = action.payload.data.accessToken;
                state.isAuthenticated = true;
                state.registrationSuccess = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed';
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
                state.registrationSuccess = true;
                state.isAuthenticated = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Registration failed';
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload.data.accessToken;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;

            });
    },
});

export const {clearRegistrationSuccess} = authSlice.actions;
export default authSlice.reducer;