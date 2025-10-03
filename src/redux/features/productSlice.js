import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API;

const initialState = {
  loading: false,        // liste/get işlemleri
  creating: false,       // create işlemi için ayrı loading
  error: null,
  products: [],
};

// LISTELE
export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/product`);
      return data?.data; // -> ürün dizisi
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

// OLUŞTUR
export const createProduct = createAsyncThunk(
  'product/createProduct',
  // payload: yeni ürün verisi (JSON veya FormData)
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/product`, payload, {
      });

      return data?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // istersen hata temizleme:
    clearProductError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? 'İstek reddedildi';
      })

      // CREATE
      .addCase(createProduct.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        const created = action.payload; // tekil ürün
        if (created) state.products.unshift(created); // liste başına ekle (veya push)
        state.creating = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload ?? action.error?.message ?? 'Oluşturma başarısız';
      });
  },
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
