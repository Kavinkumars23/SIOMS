// src/features/products/productApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7096/api/' }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    searchProducts: builder.query({
      query: ({ name = '', categoryId = null, minPrice = null, maxPrice = null, pageNumber = 1, pageSize = 10 }) => {
        const params = new URLSearchParams();

        if (name) params.append('name', name);
        if (categoryId) params.append('categoryId', categoryId);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);

        params.append('pageNumber', pageNumber);
        params.append('pageSize', pageSize);

        return `/Product/search?${params.toString()}`;
      },
      providesTags: ['Product'],
    }),

    // ✅ Move this INSIDE endpoints
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/Product',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

// Export hooks
export const {
  useSearchProductsQuery,
  useAddProductMutation,
} = productApi;
