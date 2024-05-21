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

      if (rememberMe) {
        localStorage.setItem(
          "moviesByCategory",
          JSON.stringify(moviesByCategoryTemp)
        );
      }

      return moviesByCategoryTemp;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const recommendMoviesByName = createAsyncThunk(
  "movies/recommendMoviesByName",
  async ({ movieName }, { rejectWithValue }) => {
    try {
      

      
      
        const response = await axios.get(
          `http://127.0.0.1:5000/recommendMoviesByname?movie_name=${movieName}`
        );
       
      

      // Get rememberMe from loginSlice

      

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
console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const top_rated_movies = createAsyncThunk(
  "movies/top_rated_movies",
  async ({rememberMe},{ rejectWithValue }) => {
    try {
      const cachedMovies = localStorage.getItem("top_rated_movies");
      if (cachedMovies) {
        return JSON.parse(cachedMovies);
      }

      const response = await axios.get(
        `http://127.0.0.1:5000/top_rated_movies`
      );

      if (rememberMe) {
        localStorage.setItem(
          "top_rated_movies",
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
    moviesByName: [],
    MoviesRecommended: [],
    MoviesTopRated: [],
    statusCatMovies: "idle",
    statusRecommendedMovies: "idle",
    statusRecommendedMoviesByName: "idle",
    statusMoviesTopRated: "idle",
    error: null,
    isOpen: false,
    selectedMovie: null,

  },
  reducers: {
    openModal: (state,action) => {
      state.isOpen = true;
      state.selectedMovie = action.payload;
      document.body.style.overflowY = "hidden";  
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.selectedMovie = null;
      state.moviesByName=[]
      document.body.style.overflowY = "scroll";  
      
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(recommendMoviesByCategory.pending, (state) => {
      state.statusCatMovies = "loading";
    })
    .addCase(recommendMoviesByCategory.fulfilled, (state, action) => {
      state.statusCatMovies = "succeeded";
      state.moviesByCategory = action.payload;
    })
    .addCase(recommendMoviesByCategory.rejected, (state, action) => {
      state.statusCatMovies = "failed";
      state.error = action.payload;
    })    
      .addCase(recommendedMovies.pending, (state) => {
        state.statusRecommendedMovies = "loading";
      })
      .addCase(recommendedMovies.fulfilled, (state, action) => {
        state.statusRecommendedMovies = "succeeded";
        state.MoviesRecommended = action.payload;
      })
      .addCase(recommendedMovies.rejected, (state, action) => {
        state.statusRecommendedMovies = "failed";
        state.error = action.error.message;
      })
      .addCase(top_rated_movies.pending, (state) => {
        state.statusMoviesTopRated = "loading";
      })
      .addCase(top_rated_movies.fulfilled, (state, action) => {
        state.statusMoviesTopRated = "succeeded";
        state.MoviesTopRated = action.payload;
      })
      .addCase(top_rated_movies.rejected, (state, action) => {
        state.statusMoviesTopRated = "failed";
        state.error = action.error.message;
      })
      .addCase(recommendMoviesByName.pending, (state) => {
        state.statusRecommendedMoviesByName = "loading";
        console.log(state.statusRecommendedMoviesByName)
      })
      .addCase(recommendMoviesByName.fulfilled, (state, action) => {
        state.statusRecommendedMoviesByName = "succeeded";
        console.log(state.statusRecommendedMoviesByName)
        state.moviesByName = action.payload.recommendations;
      })
      .addCase(recommendMoviesByName.rejected, (state, action) => {
        state.statusRecommendedMoviesByName = "failed";
        console.log(state.statusRecommendedMoviesByName)
        state.error = action.error.message;
      })
  },
});
export const { openModal, closeModal } = movieSlice.actions;
export default movieSlice.reducer;
