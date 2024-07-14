import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server-side-ass-6.vercel.app/api",
    credentials: "include",
  }),
  tagTypes: ["sale", "product", "addToCard"],
  endpoints: () => ({}),
});

//https://server-side-ass-6.vercel.app/api
