import { perfumesBlogApi } from "../api/perfumesBlogApi";
import type { Tag } from "@client_types/clientTypes";

export const tagApi = perfumesBlogApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllTags: builder.query<Tag[], void>({
      query: () => `tags`,
      providesTags: (result, error, arg) =>
        result ? result.map(({ id }) => ({ type: "Tag", id })) : [{type: 'Tag', id: 'LIST'}],
    }),
  }),
});


