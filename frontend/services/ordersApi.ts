import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({ url: 'orders', method: 'GET' }),
    }),
    deleteOrder: builder.mutation({
      query: (id: string) => ({
        url: `orders/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useDeleteOrderMutation } = ordersApi;
