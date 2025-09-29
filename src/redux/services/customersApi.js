import { baseApi } from './baseApi';

export const customersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Liste (pagination + arama destekli)
    getCustomers: build.query({
      query: ({ page = 1, perPage = 20, search = '' } = {}) => {
        const params = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', perPage);
        if (search) params.set('search', search);
        return `customers?${params.toString()}`;
      },
      transformResponse: (res) => {
        // API’niz nasılsa ona göre uyarlayın
        // ör: { data: [], meta: { total, current_page, per_page } }
        return {
          items: res?.data ?? res,
          total: res?.meta?.total ?? res?.total ?? 0,
          page: res?.meta?.current_page ?? 1,
          perPage: res?.meta?.per_page ?? 20,
        };
      },
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map((c) => ({ type: 'Customers', id: c.id })),
              { type: 'Customers', id: 'LIST' },
            ]
          : [{ type: 'Customers', id: 'LIST' }],
    }),

    // Tek kayıt
    getCustomerById: build.query({
      query: (id) => `customers/${id}`,
      transformResponse: (res) => res?.data ?? res,
      providesTags: (res, err, id) => [{ type: 'Customers', id }],
    }),

    // Oluştur
    createCustomer: build.mutation({
      query: (payload) => ({
        url: 'customers',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [{ type: 'Customers', id: 'LIST' }],
    }),

    // Güncelle
    updateCustomer: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `customers/${id}`,
        method: 'PUT', // PATCH ise ona göre değiştir
        body: patch,
      }),
      invalidatesTags: (res, err, { id }) => [
        { type: 'Customers', id },
        { type: 'Customers', id: 'LIST' },
      ],
    }),

    // Sil
    deleteCustomer: build.mutation({
      query: (id) => ({
        url: `customers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (res, err, id) => [
        { type: 'Customers', id },
        { type: 'Customers', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi;
