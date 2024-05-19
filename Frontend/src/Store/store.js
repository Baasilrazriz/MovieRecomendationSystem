import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Features/loginSlice";
import landingReducer from "./Features/landingSlice";
import homeReducer from "./Features/homeSlice";

export const store = configureStore({
  reducer: {
    login:loginReducer, 
    landing:landingReducer, 
    home:homeReducer, 
  },
});
