import { perfumesBlogApi } from "../api/perfumesBlogApi";
import type { Category, Blog } from "@client_types/clientTypes";

export const categoryApi = perfumesBlogApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => `categories`,
      providesTags: (result, error, id) =>
        result && Array.isArray(result)
          ? result.map(({ id }) => ({ type: "Category", id }))
          : ["Category"],
    }),
    getSingleCategoryForPage: builder.query<
      {
        category: Category;
        blogsDataForPagination?: Blog[];
        singleCategoryBlogsLength?: number;
      },
      {
        categorySlug: Category["slug"];
        startPosition?: number;
        stopPosition?: number;
      }
    >({
      query: ({ categorySlug, startPosition, stopPosition }) =>
        `categories/${categorySlug}?start=${startPosition}&stop=${stopPosition}`,
      providesTags: (result, error, args) => [
        { type: "Category" as const, id: Object.values(args)[0] },
      ],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetSingleCategoryForPageQuery } =
  categoryApi;
