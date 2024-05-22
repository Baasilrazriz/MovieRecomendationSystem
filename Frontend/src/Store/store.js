import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Features/loginSlice";
import landingReducer from "./Features/landingSlice";
import homeReducer from "./Features/homeSlice";
import movieReducer from "./Features/movieSlice";
import searchReducer from "./Features/searchSlice";
import categoryReducer from "./Features/categorySlice";

export const store = configureStore({
  reducer: {
    login:loginReducer, 
    landing:landingReducer, 
    home:homeReducer, 
    movie:movieReducer, 
    search:searchReducer, 
    category:categoryReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production' ? {
    actionSanitizer: (action) => (
      action.type === 'movies/userHistory/fulfilled' && action.payload.length > 1000
        ? { ...action, payload: '<<LONG_BLOB>>' }
        : action
    ),
    stateSanitizer: (state) => (
      state.movie.movieUserHistory.length > 1000
        ? { ...state, movieUserHistory: '<<LONG_BLOB>>' }
        : state
    ),
  } : false,
});
