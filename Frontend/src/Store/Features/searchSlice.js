import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieAPI, cacheAPI } from "../../services/apiService";

/**
 * ==================== ASYNC THUNKS ====================
 * OPTIMIZATION: These thunks are now debounced at the component level
 * This prevents unnecessary API calls on every keystroke
 */

/**
 * Record movie in user history
 */
export const record_movie_history = createAsyncThunk(
  "search/record_movie_history",
  async ({ movie_name }, { rejectWithValue }) => {
    try {
      // TODO: Implement backend endpoint for recording movie history
      // For now, store in localStorage
      const history = JSON.parse(localStorage.getItem("user_movie_history") || "[]");
      if (!history.some(m => m.title === movie_name)) {
        history.push({
          title: movie_name,
          watchedAt: new Date().toISOString(),
        });
        localStorage.setItem("user_movie_history", JSON.stringify(history));
      }
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Record search action
 */
export const on_change_search = createAsyncThunk(
  "search/on_change_search",
  async ({ search_input }, { rejectWithValue }) => {
    try {
      // TODO: Implement backend endpoint for recording searches
      // For now, store locally
      const searches = JSON.parse(localStorage.getItem("user_searches") || "[]");
      searches.push({
        query: search_input,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("user_searches", JSON.stringify(searches.slice(-50))); // Keep last 50
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * CRITICAL OPTIMIZATION: Search with debouncing
 * The component using this should debounce the dispatch!
 * This prevents excessive API calls during user typing
 */
export const fetchSuggestions = createAsyncThunk(
  "search/fetchSuggestions",
  async ({ input, rememberMe }, { rejectWithValue }) => {
    try {
      if (!input || input.length < 2) {
        return [];
      }

      // Try cache first
      const cacheKey = `search_${input.toLowerCase()}`;
      const cached = cacheAPI.get(cacheKey);
      if (cached) {
        console.log("✓ Using cached search results");
        return cached;
      }

      console.log(`🔍 Searching for: "${input}"`);
      const response = await movieAPI.searchMovies(input);

      const suggestions = Object.values(response.data || {})
        .slice(0, 10) // Limit to 10 suggestions
        .map(movie => ({
          title: movie.title || movie.movie_title || "",
          imdb_score: movie.imdb_score,
          poster_url: movie.poster_url,
        }));

      if (rememberMe) {
        cacheAPI.set(cacheKey, suggestions, 120); // 2 hour cache
      }

      console.log("✓ Search results loaded");
      return suggestions;
    } catch (error) {
      console.error("Search error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// ==================== SLICE ====================
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
    /**
     * Reset record status
     */
    idleStatusRecord: (state) => {
      state.statusRecord = "idle";
    },

    /**
     * Close search suggestions
     */
    deactiveSearch: (state) => {
      state.isSearchActive = false;
      state.searchInput = "";
      state.suggestions = [];
    },

    /**
     * Open search suggestions
     */
    activeSearch: (state, action) => {
      state.isSearchActive = true;
      state.searchInput = action.payload;
    },

    /**
     * Clear suggestions
     */
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
  },

  extraReducers: (builder) => {
    // ========== fetchSuggestions ==========
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.suggestions = action.payload;
        state.error = null;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        // Keep previous suggestions on error
      });

    // ========== record_movie_history ==========
    builder
      .addCase(record_movie_history.pending, (state) => {
        state.statusRecord = "loading";
      })
      .addCase(record_movie_history.fulfilled, (state, action) => {
        state.statusRecord = "succeeded";
      })
      .addCase(record_movie_history.rejected, (state, action) => {
        state.statusRecord = "failed";
        state.error = action.payload;
      });

    // ========== on_change_search ==========
    builder
      .addCase(on_change_search.pending, (state) => {
        state.statusSearch = "loading";
      })
      .addCase(on_change_search.fulfilled, (state, action) => {
        state.statusSearch = "succeeded";
      })
      .addCase(on_change_search.rejected, (state, action) => {
        state.statusSearch = "failed";
        state.error = action.payload;
      });
  },
});

// ==================== EXPORTS ====================
export const {
  idleStatusRecord,
  activeSearch,
  deactiveSearch,
  clearSuggestions,
} = searchSlice.actions;

export default searchSlice.reducer;
