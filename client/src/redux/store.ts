import { applyMiddleware, configureStore, Tuple } from "@reduxjs/toolkit";
import { perfumesBlogApi } from "./api/perfumesBlogApi";
import authSlice from "./features/auth/authSlice";
import blogSlice from "./features/blog/blogSlice";

const store = configureStore({
  reducer: {
    [perfumesBlogApi.reducerPath]: perfumesBlogApi.reducer,
    auth: authSlice,
    blogsDataForParts: blogSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        warnAfter: 45,
      },
    }).concat(perfumesBlogApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
