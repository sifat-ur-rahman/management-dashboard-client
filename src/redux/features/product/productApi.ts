import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (filterOptions) => ({
        url: `/products${filterOptions ? `?${filterOptions}` : ""}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getProductByUser: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    addProduct: builder.mutation({
      query: (ProductData) => ({
        url: "/product",
        method: "POST",
        body: ProductData,
      }),
      invalidatesTags: ["product"],
    }),
    updatedProduct: builder.mutation({
      query: (updatedData) => ({
        url: `/product/${updatedData.id}`,
        method: "PUT",
        body: updatedData.productData,
      }),
      invalidatesTags: ["product"],
    }),
    duplicateProduct: builder.mutation({
      query: (updatedData) => ({
        url: `/duplicate/${updatedData.id}`,
        method: "POST",
        body: updatedData.productData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (Data) => ({
        url: `/product/${Data}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
    bulkDeleteProduct: builder.mutation({
      query: (data) => ({
        url: "/bulk-delete",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    getAllProduct: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getOneProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useAddProductMutation,
  useUpdatedProductMutation,
  useDuplicateProductMutation,
  useDeleteProductMutation,
  useGetAllProductQuery,
  useBulkDeleteProductMutation,
  useGetProductByUserQuery,
  useGetOneProductByIdQuery,
} = productApi;
