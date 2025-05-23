import { configureStore } from '@reduxjs/toolkit';
import { ordersApi } from './services/ordersApi';
import { productsApi } from './services/productsApi';

export const store = configureStore({
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ordersApi.middleware, productsApi.middleware),
});
