import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as orderApi from "./orderApi";

const initialState = {
  // user-created orders (for current user)
  myOrders: [],
  myStatus: "idle",
  myError: null,

  // all orders (admin)
  allOrders: [],
  allStatus: "idle",
  allError: null,

  // create order status
  createStatus: "idle",
  createError: null,
};

//
// -------------------- Thunks --------------------
//

// Create order (user)
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await orderApi.createOrder(orderData);
      return data.order;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch logged-in user's orders
export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await orderApi.getMyOrders();
      return data.orders || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch all orders (admin)
export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await orderApi.getAllOrders();
      return data.orders || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete user's own order
export const deleteMyOrder = createAsyncThunk(
  "order/deleteMyOrder",
  async (id, { rejectWithValue }) => {
    try {
      await orderApi.deleteMyOrder(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update order status (admin)
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ id, statusData }, { rejectWithValue }) => {
    try {
      const { data } = await orderApi.updateOrderStatus(id, statusData);
      return { id, order: data.order };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete order by admin
export const deleteOrderByAdmin = createAsyncThunk(
  "order/deleteOrderByAdmin",
  async (id, { rejectWithValue }) => {
    try {
      await orderApi.deleteOrderByAdmin(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

//
// -------------------- Slice --------------------
//
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // optional helpers
    clearOrderErrors(state) {
      state.createError = null;
      state.myError = null;
      state.allError = null;
    },
    clearAllOrders(state) {
      state.allOrders = [];
      state.allStatus = "idle";
      state.allError = null;
    },
    clearMyOrders(state) {
      state.myOrders = [];
      state.myStatus = "idle";
      state.myError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        const newOrder = action.payload;
        // add to head of myOrders
        if (newOrder) state.myOrders.unshift(newOrder);
        // also add to allOrders if present (useful for admins viewing while creating)
        if (newOrder) state.allOrders.unshift(newOrder);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload || action.error?.message;
      })

      // fetchMyOrders
      .addCase(fetchMyOrders.pending, (state) => {
        state.myStatus = "loading";
        state.myError = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.myStatus = "succeeded";
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.myStatus = "failed";
        state.myError = action.payload || action.error?.message;
        state.myOrders = [];
      })

      // fetchAllOrders (admin)
      .addCase(fetchAllOrders.pending, (state) => {
        state.allStatus = "loading";
        state.allError = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.allStatus = "succeeded";
        state.allOrders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.allStatus = "failed";
        state.allError = action.payload || action.error?.message;
        state.allOrders = [];
      })

      // deleteMyOrder
      .addCase(deleteMyOrder.pending, (state) => {
        // you may set a small local flag if desired
        state.myError = null;
      })
      .addCase(deleteMyOrder.fulfilled, (state, action) => {
        const id = action.payload;
        state.myOrders = state.myOrders.filter((o) => o._id !== id && o.id !== id);
        // also remove from allOrders if present
        state.allOrders = state.allOrders.filter((o) => o._id !== id && o.id !== id);
      })
      .addCase(deleteMyOrder.rejected, (state, action) => {
        state.myError = action.payload || action.error?.message;
      })

      // updateOrderStatus (admin)
      .addCase(updateOrderStatus.pending, (state) => {
        state.allError = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { id, order } = action.payload;
        // update in allOrders
        state.allOrders = state.allOrders.map((o) =>
          (o._id === id || o.id === id) ? order : o
        );
        // update in myOrders (if present)
        state.myOrders = state.myOrders.map((o) =>
          (o._id === id || o.id === id) ? order : o
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.allError = action.payload || action.error?.message;
      })

      // deleteOrderByAdmin
      .addCase(deleteOrderByAdmin.pending, (state) => {
        state.allError = null;
      })
      .addCase(deleteOrderByAdmin.fulfilled, (state, action) => {
        const id = action.payload;
        state.allOrders = state.allOrders.filter((o) => o._id !== id && o.id !== id);
        state.myOrders = state.myOrders.filter((o) => o._id !== id && o.id !== id);
      })
      .addCase(deleteOrderByAdmin.rejected, (state, action) => {
        state.allError = action.payload || action.error?.message;
      });
  },
});

export const { clearOrderErrors, clearAllOrders, clearMyOrders } = orderSlice.actions;
export default orderSlice.reducer;
