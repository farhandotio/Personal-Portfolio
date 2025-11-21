import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "./authApi";

// Get Profile
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.getProfile();
      return res.data?.user || null; // <-- user always object/null
    } catch (err) {
      return rejectWithValue("Unauthorized");
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authApi.login(credentials);
      return res.data?.user || null;
    } catch (err) {
      return rejectWithValue("Login failed");
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await authApi.register(formData);
      return res.data?.user || null;
    } catch (err) {
      return rejectWithValue("Register failed");
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      return true;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
);

const initialState = {
  user: null,     // always object or null
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    setUser(state, action) {
      state.user = action.payload || null; // ensure object/null
    },
    clearUser(state) {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // object
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })

      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // object
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })

      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // object
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })

      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logoutUser.rejected, () => {});
  },
});

export const { clearAuthError, clearUser, setUser } = authSlice.actions;
export default authSlice.reducer;
