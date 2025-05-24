import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  selectedSize?: string;
}

interface CartState {
  items: Record<string, CartItem>;
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity: number }>
    ) {
      const { id, title, image, price, quantity, selectedSize } =
        action.payload;
      if (state.items[id]) {
        state.items[id].quantity += quantity;
      } else {
        state.items[id] = { id, title, image, price, quantity, selectedSize };
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      if (state.items[id]) {
        if (quantity > 0) {
          state.items[id].quantity = quantity;
        } else {
          delete state.items[id];
        }
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      delete state.items[action.payload];
    },
    clearCart(state) {
      state.items = {};
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
