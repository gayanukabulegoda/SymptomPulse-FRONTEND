import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';
import {API_URL} from '../../config';
/**
 * @file: notificationSlice.ts
 * @description: The redux slice for notification related actions.
 * @thunks: fetchPendingNotifications
 * @exports notificationSlice
 */
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
        const response = await axiosInstance.get(`${API_URL}/notifications/`);
        return response.data.data;
    }
);

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {},
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

export default notificationSlice.reducer;