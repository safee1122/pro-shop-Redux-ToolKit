import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import axios from "axios";

const initialState = {
  product: { reviews: [] },
  loading: false,
  id: "",
};

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, { rejectWithValue, getState }) => {
    const state = getState();
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${state.productDetails.id}`
      );
      const { data } = res;
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productDetailSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.product = { reviews: [] };
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        // Add any fetched products to the array
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload.error && action.error.message
            ? action.payload.error
            : action.error.message;
      });
  },
});
export default productDetailSlice.reducer;
export const productDetail = (state) => state.productDetails;
export const { setId } = productDetailSlice.actions;
