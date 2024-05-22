import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categories : [
        "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary",
        "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Musical",
        "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"
      ]
      
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
  }
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
