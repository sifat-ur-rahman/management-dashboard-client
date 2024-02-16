import { baseApi } from "../../api/baseApi";

const addToCardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAddToCardByUser: builder.query({
      query: (id) => ({
        url: `/add-to-card/${id}`,
        method: "GET",
      }),
      providesTags: ["addToCard"],
    }),
    addAddToCard: builder.mutation({
      query: (addToCardData) => ({
        url: "/add-to-card",
        method: "POST",
        body: addToCardData,
      }),
      invalidatesTags: ["addToCard"],
    }),
  }),
});

export const { useGetAddToCardByUserQuery, useAddAddToCardMutation } =
  addToCardApi;
