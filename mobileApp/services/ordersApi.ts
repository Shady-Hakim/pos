import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  orderId: string;
  items: OrderItem[];
  totalPrice: number;
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    submitOrder: builder.mutation<void, Order>({
      query: (order) => ({
        url: 'orders',
        method: 'POST',
        data: order,
      }),
    }),
  }),
});

export const { useSubmitOrderMutation } = ordersApi;
