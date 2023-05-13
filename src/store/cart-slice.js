import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
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
        existingItem.quantity ++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalQuantity ++;
      state.totalAmount += newItem.price;
    },
    removeItemFromCart(state, action) {
      const removeId = action.payload;
      const existingItem = state.items.find(item => item.id === removeId);
      if (existingItem.quantity > 1) {
        existingItem.quantity --;
        existingItem.totalPrice -= existingItem.price;
      } else {
        state.items = state.items.filter(item => item.id !== removeId);
      }
      state.totalQuantity --;
      state.totalAmount -= existingItem.price;
    }
  }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;