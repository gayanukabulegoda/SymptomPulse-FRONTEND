import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '../../config';

interface Notification {
    id: number;
    title: string;
    body: string;
    scheduledAt: string;
    medicationEntryId?: number;
}

interface NotificationState {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    notifications: [],
    loading: false,
    error: null,
};

export const fetchPendingNotifications = createAsyncThunk(
    'notifications/fetchPending',
    async () => {
        const response = await axios.get(`${API_URL}/notifications/pending`);
        return response.data.data;
    }
);

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        clearNotifications: (state) => {
            state.notifications = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPendingNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPendingNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
            })
            .addCase(fetchPendingNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch notifications';
            });
    },
});

export const {clearNotifications} = notificationSlice.actions;
export default notificationSlice.reducer;