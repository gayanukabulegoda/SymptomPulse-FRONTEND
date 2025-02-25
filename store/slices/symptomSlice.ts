import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '../../config';

interface Condition {
    conditionName: string;
    likelihood: string;
    apiSource: string;
}

interface SymptomEntry {
    id: number;
    userId: number;
    symptoms: string[];
    entryDate: string;
    conditions: Condition[];
}

interface SymptomState {
    entries: SymptomEntry[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    hasMore: boolean;
}

const initialState: SymptomState = {
    entries: [],
    loading: false,
    error: null,
    currentPage: 1,
    hasMore: true,
};

export const logSymptoms = createAsyncThunk(
    'symptoms/log',
    async (symptoms: string[]) => {
        const response = await axios.post(`${API_URL}/symptoms`, {symptoms});
        return response.data.data;
    }
);

export const fetchSymptomHistory = createAsyncThunk(
    'symptoms/fetchHistory',
    async ({page, limit}: { page: number; limit: number }) => {
        const response = await axios.get(`${API_URL}/symptoms`, {
            params: {page, limit},
        });
        return response.data.data;
    }
);

const symptomSlice = createSlice({
    name: 'symptoms',
    initialState,
    reducers: {
        clearSymptoms: (state) => {
            state.entries = [];
            state.currentPage = 1;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logSymptoms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logSymptoms.fulfilled, (state, action) => {
                state.loading = false;
                state.entries.unshift(action.payload);
            })
            .addCase(logSymptoms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to log symptoms';
            })
            .addCase(fetchSymptomHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSymptomHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.entries = [...state.entries, ...action.payload];
                state.hasMore = action.payload.length > 0;
                state.currentPage += 1;
            })
            .addCase(fetchSymptomHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch history';
            });
    },
});

export const {clearSymptoms} = symptomSlice.actions;
export default symptomSlice.reducer;