import { baseApi } from "../../api/baseApi";

const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesHistory: builder.query({
      query: () => ({
        url: "/sales-history",
        method: "GET",
      }),
      providesTags: ["sale"],
    }),
    addSale: builder.mutation({
      query: (saleData) => ({
        url: "/sales",
        method: "POST",
        body: saleData,
      }),
      invalidatesTags: ["sale"],
    }),
  }),
});

export const { useGetSalesHistoryQuery, useAddSaleMutation } = saleApi;
