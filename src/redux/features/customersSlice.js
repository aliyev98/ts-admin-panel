import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API;

const initialState = {
  loading: false,
  error: null,
  customers: [],
};

export const getCustomers = createAsyncThunk('customers/getCustomers', async () => {
  const { data } = await axios.get(`${BASE_URL}/user/list`);
  return data?.data;
});

export const brandsSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'İstek reddedildi';
      });
  },
});

export default customersSlice.reducer;
