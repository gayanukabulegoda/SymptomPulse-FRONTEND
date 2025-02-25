import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '../../config';

interface MedicationState {
    medications: any[];
    loading: boolean;
    error: string | null;
}

const initialState: MedicationState = {
    medications: [],
    loading: false,
    error: null,
};

export const addMedication = createAsyncThunk(
    'medications/add',
    async (medicationData: {
        name: string;
        schedule: string;
        startDate: Date;
        dosage?: string;
        endDate?: Date;
    }) => {
        const response = await axios.post(`${API_URL}/medications`, medicationData);
        return response.data.data;
    }
);

export const fetchMedications = createAsyncThunk(
    'medications/fetch',
    async () => {
        const response = await axios.get(`${API_URL}/medications`);
        return response.data.data;
    }
);

const medicationSlice = createSlice({
    name: 'medications',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addMedication.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMedication.fulfilled, (state, action) => {
                state.loading = false;
                state.medications.unshift(action.payload);
            })
            .addCase(addMedication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add medication';
            })
            .addCase(fetchMedications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMedications.fulfilled, (state, action) => {
                state.loading = false;
                state.medications = action.payload;
            })
            .addCase(fetchMedications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch medications';
            });
    },
});

export default medicationSlice.reducer;