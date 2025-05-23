import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: 'products', method: 'GET' }),
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
    }),
    addProduct: builder.mutation({
      query: (product: { image: string; name: string; price: number }) => ({
        url: 'products',
        method: 'POST',
        data: product,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
  useAddProductMutation,
} = productsApi;
