import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sale: [],
};

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {},
});

export default saleSlice.reducer;
