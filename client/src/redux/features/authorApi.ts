import { perfumesBlogApi } from "../api/perfumesBlogApi";
import type { Author } from "@client_types/clientTypes";

export const authorApi = perfumesBlogApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllAuthors: builder.query<Author[], void>({
      query: () => `authors`,
      providesTags: (result, error, arg) =>
        result ? result.map(({ id }) => ({ type: "Author", id })) : ["Author"],
    }),
  }),
});

export const {} = authorApi;
