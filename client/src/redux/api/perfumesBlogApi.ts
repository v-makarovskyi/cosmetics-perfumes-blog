import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const perfumesBlogApi = createApi({
  reducerPath: "perfumesBlogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/api/",
    prepareHeaders: (headers,  {getState}) => {},
    credentials: "include",
  }),
  tagTypes: ["User", "Blog", "Category", "Author", "Tag"],
  endpoints: () => ({}),
});
