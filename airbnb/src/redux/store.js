import { configureStore } from "@reduxjs/toolkit";
import { responsiveSlice } from "./slice/responsiveSlice";
import { authSlice } from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    responsive: responsiveSlice.reducer,
    auth: authSlice.reducer,
  },
});
