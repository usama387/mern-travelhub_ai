import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl = import.meta.env.VITE_BOOKING_BACKEND_URL;

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl,
  }),
  tagTypes: ["Booking"],
  endpoints: (builder) => ({
    // Create a new booking
    createNewBooking: builder.mutation({
      query: (bookingData) => ({
        url: `/create/${bookingData.userId}`,
        method: "POST",
        body: {
          packageId: bookingData.packageId,
          persons: bookingData.persons,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          transportation: bookingData.transportation,
          hotel: bookingData.hotel,
          totalPrice: bookingData.totalPrice,
        },
      }),
      invalidatesTags: ["Booking"],
    }),

    // Fetch all bookings for a user
    getUserBookings: builder.query({
      query: (userId) => ({
        url: `/get-bookings/${userId}`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),

    // Cancel booking by user
    cancelUserBooking: builder.mutation({
      query: ({ userId, bookingId }) => ({
        url: `/bookings/${userId}/${bookingId}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: ["Booking"],
    }),

    // Admin updates booking status (CONFIRMED / CANCELLED)
    updateBookingStatus: builder.mutation({
      query: ({ bookingId, status }) => ({
        url: `/bookings/${bookingId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useCreateNewBookingMutation,
  useGetUserBookingsQuery,
  useCancelUserBookingMutation,
  useUpdateBookingStatusMutation,
} = bookingApi;
