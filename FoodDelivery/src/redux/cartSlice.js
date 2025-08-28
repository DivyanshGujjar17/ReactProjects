import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    additems: (state, action) => {
      const item = action.payload;
      const existingItem = state.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.push({ ...item, qty: 1 });
      }
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    increaseQty: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item) item.qty += 1;
    },
    decreaseQty: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },
  },
});

export const { additems, removeItem, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;