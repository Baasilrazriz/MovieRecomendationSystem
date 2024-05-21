import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const record_movie_history = createAsyncThunk(
    "search/record_movie_history",
    async ({ movie_name }, { rejectWithValue }) => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/record_user_history", {
          movie_name,
        });
        return username;
      } catch (error) {
        console.log(rejectWithValue(error.response.data));
        return rejectWithValue(error.response.data);
      }
    }
  );
export const on_change_search = createAsyncThunk(
    "search/on_change_search",
    async ({ search_input }, { rejectWithValue }) => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/on_change_search", {
            search_input,
        });
        return username;
      } catch (error) {
        console.log(rejectWithValue(error.response.data));
        return rejectWithValue(error.response.data);
      }
    }
  );
export const fetchSuggestions = createAsyncThunk(
  "search/fetchSuggestions",
  async ({  username,input,rememberMe}, { rejectWithValue }) => {
    try {
        const cachedMovies = localStorage.getItem("searchedmovies");
      if (cachedMovies) {
        return JSON.parse(cachedMovies);
      }

      const response = await axios.get(
        `http://127.0.0.1:5000/user_searches?username=${username}`
      );
      const filteredMovies = response.data.filter((movie) => {
        const movieName = movie.toLowerCase().replace(/\s/g, "");
        const searchInput = input.toLowerCase().replace(/\s/g, "");
        return movieName.includes(searchInput);
      });
      const randomMovies = filteredMovies
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
        console.log(randomMovies)    

        if (rememberMe) {
            localStorage.setItem(
              "searchedmovies",
              JSON.stringify(randomMovies)
            );
          }
      return randomMovies;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    suggestions: [],
    status: "idle",
    statusRecord: "idle",
    statusSearch: "idle",
    isSearchActive: false,
    searchInput: "",
    error: null,
  },
  reducers: {
    idleStatusRecord: (state) => {
        state.statusRecord = "idle";
      },
    deactiveSearch: (state) => {
        state.isSearchActive = false;
        state.searchInput = "";
      },
    activeSearch: (state,action) => {
        state.isSearchActive = true;
        state.searchInput = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched suggestions to the array
        state.suggestions = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(record_movie_history.pending, (state) => {
        state.statusRecord = "loading";
      })
      .addCase(record_movie_history.fulfilled, (state, action) => {
        state.statusRecord = "succeeded";
      })
      .addCase(record_movie_history.rejected, (state, action) => {
        state.statusRecord = "failed";
        state.error = action.error.message;
      })
      .addCase(on_change_search.pending, (state) => {
        state.statusSearch = "loading";
      })
      .addCase(on_change_search.fulfilled, (state, action) => {
        state.statusSearch = "succeeded";
      })
      .addCase(on_change_search.rejected, (state, action) => {
        state.statusSearch = "failed";
        state.error = action.error.message;
      });
  },
});
export const {
    idleStatusRecord,
    activeSearch,deactiveSearch
  } = searchSlice.actions;
export default searchSlice.reducer;
