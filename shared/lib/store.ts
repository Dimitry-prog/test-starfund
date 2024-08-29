import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { cartSlice } from '@/app/(root)/products/_slices/cart-slice';

const rootReducer = combineSlices(cartSlice);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
