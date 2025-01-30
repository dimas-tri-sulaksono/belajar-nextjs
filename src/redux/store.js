import { configureStore, createSlice } from "@reduxjs/toolkit";
import screenSlice from "./screenSlice/screenSlice";

export const store = configureStore({
  reducer: {
    //  panggil reducer-reducer yang udah dibuat
    screen: screenSlice,
  },
});

export default store;
