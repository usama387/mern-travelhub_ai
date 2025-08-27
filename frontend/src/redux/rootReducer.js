import { bookingApi } from "@/features/api/bookingApi";
import { packageApi } from "@/features/api/packageApi";
import { combineReducers } from "@reduxjs/toolkit";

// Combine all reducers into a single root reducer and the passed in store.js.
const rootReducer = combineReducers({
  [packageApi.reducerPath]: packageApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
});

export default rootReducer;
