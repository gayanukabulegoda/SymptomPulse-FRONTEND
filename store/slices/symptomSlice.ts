import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';
import {API_URL} from '../../config';
/**
 * @file: symptomSlice.ts
 * @description: The redux slice for symptom related actions.
 * @thunks: logSymptoms, fetchSymptomHistory
 * @reducer: clearSymptoms
 * @exports symptomSlice
 */
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
        const response = await axiosInstance.post(`${API_URL}/symptoms`, {symptoms});
        return response.data.data;
    }
);

export const fetchSymptomHistory = createAsyncThunk(
    'symptoms/fetchHistory',
    async ({page, limit}: { page: number; limit: number }, { dispatch }) => {
        // If it's the first page, clear the existing entries first
        if (page === 1) {
            dispatch(clearSymptoms());
        }
        const response = await axiosInstance.get(`${API_URL}/symptoms`, {
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
                // To Ensure we're not adding duplicates by checking IDs
                const existingIds = new Set(state.entries.map((entry: SymptomEntry) => entry.id));
                const newEntries = action.payload.filter((entry: SymptomEntry) => !existingIds.has(entry.id));
                state.entries = [...state.entries, ...newEntries];
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