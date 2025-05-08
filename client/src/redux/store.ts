import { applyMiddleware, configureStore, Tuple } from "@reduxjs/toolkit";
import { perfumesBlogApi } from "./api/perfumesBlogApi";

const store = configureStore({
  reducer: {
    [perfumesBlogApi.reducerPath]: perfumesBlogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        warnAfter: 45,
      },
    }).concat(perfumesBlogApi.middleware),
});

export default store;
