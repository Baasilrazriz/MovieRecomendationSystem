import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isOpen: false,
  
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    openModal: (state) => {
        state.isOpen = true;
      },
      closeModal: (state) => {
        state.isOpen = false;
      },
  }
});

export const {openModal,closeModal} = movieSlice.actions;
export default movieSlice.reducer;
