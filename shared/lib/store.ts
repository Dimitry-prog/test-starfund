import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { cartSlice } from '@/app/(root)/products/_slices/cart-slice';

const rootReducer = combineSlices(cartSlice);

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
