import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const userLogin = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    const { email, password } = user;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        `http://localhost:5000/api/user/login`,
        {
          email,
          password,
        },
        config
      );
      const { data } = res;
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);
export const userRefreshToken = (order) => async (dispatch, getState) => {
  try {
    dispatch(refreshTokenRequest());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.refreshToken}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/user/refreshToken`,
      config
    );
    console.log(data.token);
    const updateStorage = JSON.parse(localStorage.getItem("userInfo"));
    updateStorage.token = data.token;

    localStorage.setItem("userInfo", JSON.stringify(updateStorage));

    dispatch(refreshTokenSuccess(data.token));
  } catch (error) {
    console.log(error);
    dispatch(refreshTokenFailed(error));
  }
};
export const userLogout = (order) => async (dispatch, getState) => {
  try {
    dispatch(userLogoutRequest());
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.refreshToken}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/user/logout`,
      config
    );
    console.log(data);

    dispatch(userLogoutSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(userLogoutFailed(error));
  }
};

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : false;
const initialState = {
  userInfo: userInfoFromStorage,
};
const userLoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    userLogout(state, action) {
      localStorage.removeItem("userInfo");
      state.userInfo = null;
    },
    refreshTokenRequest(state, action) {
      state.loading = true;
    },
    refreshTokenSuccess(state, action) {
      state.loading = false;
      state.userInfo.token = action.payload;
    },
    refreshTokenFailed(state, action) {
      console.log(action.payload);
      state.loading = false;
      state.error =
        action.payload.error && action.error.message
          ? action.payload.error
          : action.error.message;
    },
    userLogoutRequest(state, action) {
      state.loading = true;
    },
    userLogoutSuccess(state, action) {
      state.loading = false;
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    userLogoutFailed(state, action) {
      console.log(action.payload);
      state.loading = false;
      state.error =
        action.payload.error && action.error.message
          ? action.payload.error
          : action.error.message;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        // Add any fetched products to the array
        state.userInfo = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload.error && action.error.message
            ? action.payload.error
            : action.error.message;
      });
  },
});

export default userLoginSlice.reducer;

export const {
  refreshTokenFailed,
  refreshTokenRequest,
  refreshTokenSuccess,
  userLogoutRequest,
  userLogoutSuccess,
  userLogoutFailed,
} = userLoginSlice.actions;
