import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

  export const recommendMoviesByCategory = createAsyncThunk(
  "movies/recommendMoviesByCategory",
  async ({ categories, rememberMe }, { rejectWithValue }) => {
    try {
      const cachedMovies = localStorage.getItem("moviesByCategory");
      if (cachedMovies) {
        return JSON.parse(cachedMovies);
      }

      const moviesByCategoryTemp = {};
      for (const category of categories) {
        const response = await axios.get(
          `http://127.0.0.1:5000/movie_filter_by_category?category=${category}`
        );
        if (response.data) {
          moviesByCategoryTemp[category] = Object.values(response.data);
        }
      }

      // Get rememberMe from loginSlice

      if (rememberMe) {
        localStorage.setItem(
          "moviesByCategory",
          JSON.stringify(moviesByCategoryTemp)
        );
      }

      return moviesByCategoryTemp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const recommendMoviesByName = createAsyncThunk(
  "movies/recommendMoviesByName",
  async ({ movieName, rememberMe }, { rejectWithValue }) => {
    try {
      const cachedMovies = localStorage.getItem("recommendationByName");
      if (cachedMovies) {
        return JSON.parse(cachedMovies);
      }

      
      
        const response = await axios.get(
          `http://127.0.0.1:5000/recommendMoviesByname?movie_name=${movieName}`
        );
       
      

      // Get rememberMe from loginSlice

      if (rememberMe) {
        localStorage.setItem(
          "recommendationByName",
          JSON.stringify(response.data)
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const recommendedMovies = createAsyncThunk(
  "movies/recommendedMovies",
  async ({rememberMe},{ rejectWithValue }) => {
    try {
      const cachedMovies = localStorage.getItem("recommendedmovies");
      if (cachedMovies) {
        return JSON.parse(cachedMovies);
      }

      const response = await axios.get(
        `http://127.0.0.1:5000/recommend_movies`
      );

      if (rememberMe) {
        localStorage.setItem(
          "recommendedmovies",
          JSON.stringify(response.data)
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const InitialRecommendedMovies = createAsyncThunk(
  "movies/InitialRecommendedMovies",
  async ({rememberMe},{ rejectWithValue }) => {
    try {
      const cachedMovies = localStorage.getItem("initialrecommendation");
      if (cachedMovies) {
        return JSON.parse(cachedMovies);
      }

      const response = await axios.get(
        `http://127.0.0.1:5000/initial_recommendation`
      );

      if (rememberMe) {
        localStorage.setItem(
          "initialrecommendation",
          JSON.stringify(response.data)
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const movieSlice = createSlice({
  name: "movie  ",
  initialState: {
    moviesByCategory: {},
    moviesByName: {},
    recommendMovies: {},
    initialRecommendMovies: {},
    statusCatMovies: "idle",
    statusRecommendedMovies: "",
    statusRecommendedMoviesByName: "",
    statusInitialRecommendedMovies: "",
    error: null,
    isOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(recommendMoviesByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(recommendMoviesByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.moviesByCategory = action.payload;
      })
      .addCase(recommendMoviesByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(recommendedMovies.pending, (state) => {
        state.statusRecommendedMovies = "loading";
      })
      .addCase(recommendedMovies.fulfilled, (state, action) => {
        state.statusRecommendedMovies = "succeeded";
        state.recommendMovies = action.payload;
      })
      .addCase(recommendedMovies.rejected, (state, action) => {
        state.statusRecommendedMovies = "failed";
        state.error = action.error.message;
      })
      .addCase(InitialRecommendedMovies.pending, (state) => {
        state.statusInitialRecommendedMovies = "loading";
      })
      .addCase(InitialRecommendedMovies.fulfilled, (state, action) => {
        state.statusInitialRecommendedMovies = "succeeded";
        state.initialRecommendMovies = action.payload;
      })
      .addCase(InitialRecommendedMovies.rejected, (state, action) => {
        state.statusInitialRecommendedMovies = "failed";
        state.error = action.error.message;
      })
      .addCase(recommendMoviesByName.pending, (state) => {
        state.statusRecommendedMoviesByName = "loading";
      })
      .addCase(recommendMoviesByName.fulfilled, (state, action) => {
        state.statusRecommendedMoviesByName = "succeeded";
        state.moviesByName = action.payload;
      })
      .addCase(recommendMoviesByName.rejected, (state, action) => {
        state.statusRecommendedMoviesByName = "failed";
        state.error = action.error.message;
      })
  },
});
export const { openModal, closeModal } = movieSlice.actions;
export default movieSlice.reducer;
