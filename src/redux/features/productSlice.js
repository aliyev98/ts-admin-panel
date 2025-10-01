import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API;

const initialState = {
  loading: false,
  error: null,
  products: [],
};

export const getProducts = createAsyncThunk('product/getProducts', async () => {
  const { data } = await axios.get(`${BASE_URL}/product`);
  return data?.data;
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'İstek reddedildi';
      });
  },
});

export default productSlice.reducer;
