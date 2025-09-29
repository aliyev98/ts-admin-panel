// redux/brandsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brands: [],
};

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    // payload: Array<Brand>
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    clearBrands: (state) => {
      state.brands = [];
    },
  },
});

export const { setBrands, clearBrands } = brandsSlice.actions;

export default brandsSlice.reducer;
