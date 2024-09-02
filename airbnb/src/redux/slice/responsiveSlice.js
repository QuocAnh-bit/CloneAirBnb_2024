import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statusMenu: false,
};

export const responsiveSlice = createSlice({
  name: "responsive",
  initialState,
  reducers: {
    openMenu: (state, action) => {
      state.statusMenu = true;
    },
  },
});
