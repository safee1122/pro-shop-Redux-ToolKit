import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const Register = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    const { name, email, password } = user;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `http://localhost:5000/api/user`,
        { name, email, password },
        config
      );
      const { data } = res;
      //   localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);
// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;
const initialState = {
  status: "",
};
const userRegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(Register.pending, (state) => {
        state.loading = true;
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.loading = false;
        // Add any fetched products to the array
        state.status = action.payload;
      })
      .addCase(Register.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
        state.error =
          action.payload.error && action.error.message
            ? action.payload.error
            : action.error.message;
      });
  },
});
export default userRegisterSlice.reducer;
