import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '../../config';

interface AuthState {
    user: any | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}: { email: string; password: string }) => {
        const response = await axios.post(`${API_URL}/auth/login`, {
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
        const response = await axios.post(`${API_URL}/auth/register`, {
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
        const response = await axios.post(`${API_URL}/auth/refresh`);
        await SecureStore.setItemAsync('token', response.data.data.accessToken);
        return response.data;
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await axios.post(`${API_URL}/auth/logout`);
        await SecureStore.deleteItemAsync('token');
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
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
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed';
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.isAuthenticated = true;
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

export default authSlice.reducer;