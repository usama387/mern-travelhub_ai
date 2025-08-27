import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl = import.meta.env.VITE_PACKAGE_BACKEND_URL;

export const packageApi = createApi({
  reducerPath: "packageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl,
  }),
  tagTypes: ["Packages"],
  endpoints: (builder) => ({
    createNewPackage: builder.mutation({
      query: (packageData) => ({
        url: "/create",
        method: "POST",
        body: packageData,
      }),
      invalidatesTags: ["Packages"],
    }),
    getAllPackages: builder.query({
      query: () => ({
        url: "/getPackages",
        method: "GET",
      }),
      providesTags: ["Packages"],
    }),
    updatePackage: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Packages"],
    }),
    getPackageDetails: builder.query({
      query: (id) => ({
        url: `/get/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Packages"],
    }),
    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Packages"],
    }),
  }),
});

export const {
  useCreateNewPackageMutation,
  useGetAllPackagesQuery,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  useGetPackageDetailsQuery,
} = packageApi;
