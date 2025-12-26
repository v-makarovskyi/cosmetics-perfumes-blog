import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const PUBLIC_API_BASE_URL = 'https://cosmetics-perfumes-blog.vercel.app'


export const perfumesBlogApi = createApi({
  reducerPath: "perfumesBlogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PUBLIC_API_BASE_URL,
    prepareHeaders: (headers,  {getState}) => {},
    credentials: "include",
  }),
  tagTypes: ["User", "Blog", "Category", "Author", "Tag"],
  endpoints: () => ({}),
});
