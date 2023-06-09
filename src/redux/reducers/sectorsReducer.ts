import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {api} from '../../api/admin/api_admin_products';

export const fetchSelectAllSector = createAsyncThunk(
    "sectors/fetchSelectAllSector",
    async () => {
        const responseData = await api.getAllSectots();
        if (responseData.code !== 200) {
            throw new Error('Failed to fetch sectors');
        }
        return responseData.data;
        }
);

const sectorsSlice = createSlice({
    name: "sectors",
    initialState: {
        sectors: [],
        loading: false,
        error: null as string | null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSelectAllSector.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSelectAllSector.fulfilled, (state, action) => {
                state.loading = false;
                state.sectors = action.payload;
                state.error = null;
            })
            .addCase(fetchSelectAllSector.rejected, (state, action) => {
                state.loading = false;
                if (action.payload instanceof Error) {
                    state.error = action.payload.message;
                } else {
                    state.error = null;
                }
            });
    }
});

export const { actions, reducer } = sectorsSlice;

export default reducer;