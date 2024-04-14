import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery(
    {
      baseUrl:
        "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74",
    },
    20000
  ),

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "",
      // query: () => "products",
    }),
    // getProduct: builder.query({
    //   query: (items) => `/${items.price}`,
    // }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
//export const { useGetAllProductsQuery, useGetProductQuery } = productsApi;
