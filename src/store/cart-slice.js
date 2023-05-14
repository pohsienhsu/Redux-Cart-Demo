import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  changed: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price
        })
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalQuantity++;
      state.totalAmount += newItem.price;
      state.changed = true;
    },
    removeItemFromCart(state, action) {
      const removeId = action.payload;
      const existingItem = state.items.find(item => item.id === removeId);
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      } else {
        state.items = state.items.filter(item => item.id !== removeId);
      }
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
      state.changed = true;
    }
  }
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;