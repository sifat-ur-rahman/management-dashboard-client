import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addToCard: [],
};

const addToCardSlice = createSlice({
  name: "addToCard",
  initialState,
  reducers: {},
});

export default addToCardSlice.reducer;
