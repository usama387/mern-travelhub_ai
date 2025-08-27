import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { packageApi } from "@/features/api/packageApi";
import { bookingApi } from "@/features/api/bookingApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(packageApi.middleware,bookingApi.middleware),
});