import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://8000.jobing.az/api', // <- gerekirse .env'den al
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token; // varsa auth token
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Customers'], // cache/invalidation için
  endpoints: () => ({}),
});
