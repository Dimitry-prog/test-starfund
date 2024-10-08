import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductType } from '@/app/(root)/products/types';

type CartItem = {
  product: ProductType;
  qty: number;
};

type CartState = {
  cartItems: CartItem[];
};

const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem('cart') ?? '[]'),
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    toggleProductInCart: (
      state,
      action: PayloadAction<{
        product: ProductType;
        actionType: 'add' | 'remove';
      }>
    ) => {
      const { product, actionType } = action.payload;

      const existingItem = state.cartItems.find((item) => item.product.id === product.id);

      if (actionType === 'add') {
        if (existingItem) {
          existingItem.qty += 1;
        } else {
          state.cartItems.push({ product, qty: 1 });
        }
      } else if (actionType === 'remove') {
        if (existingItem) {
          if (existingItem.qty > 1) {
            existingItem.qty -= 1;
          } else {
            state.cartItems = state.cartItems.filter((item) => item.product.id !== product.id);
          }
        }
      }

      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((item) => item.product.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
  },
  selectors: {
    getCartItems: (state) => state.cartItems,
  },
});
export const { actions: cartSliceActions, selectors: cartSliceSelectors } = cartSlice;
