import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {api} from '../../api/admin/api_admin_products'; // Importar a sua api

export const fetchAdminProducts = createAsyncThunk(
  "products/fetchAdminProducts",
  async (page: number) => {
    const responseData = await api.consultAdminProducts(page);
    if (responseData.code !== 200) {
      throw new Error('Failed to fetch products');
    }
    return responseData.data;
  }
);


const productsSlice = createSlice({
    name: "products",
    initialState: {
      products: [],
      loading: false,
      error: null as string | null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAdminProducts.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAdminProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload;
          state.error = null;
        })
        .addCase(fetchAdminProducts.rejected, (state, action) => {
          state.loading = false;
          if (action.payload instanceof Error) {
            state.error = action.payload.message;
          } else {
            state.error = null;
          }
        });
    }
  });

export const { actions, reducer } = productsSlice;

export default reducer;
