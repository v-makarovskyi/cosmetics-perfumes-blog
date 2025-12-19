import { perfumesBlogApi } from "../../api/perfumesBlogApi";
import type { Blog, Category } from "@client_types/clientTypes";
import { getBlogsDataForHeader, getBlogsDataForSidebar } from "./blogSlice";

export const blogApi = perfumesBlogApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getAllPosts: build.query<
      {
        blogsDataForHeader: Blog[];
        blogsDataForSidebar: Blog[];
        blogsDataForPagination: Blog[];
        allBlogsLength: number;
      },
      { startPosition: number; stopPosition: number }
    >({
      query: ({ startPosition, stopPosition }) =>
        `blogs?start=${startPosition}&stop=${stopPosition}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        const blogsForHeader = data?.blogsDataForHeader;
        const blogsForSidebar = data?.blogsDataForSidebar;
        dispatch(getBlogsDataForHeader(blogsForHeader));
        dispatch(getBlogsDataForSidebar(blogsForSidebar));
      },
      providesTags: (result, error, args) => {
        let output: { type: "Blog"; id: string }[] = [];
        for (let key in result) {
          if (Array.isArray(result[key])) {
            output = [
              ...output,
              ...result[key].map(({ id }) => ({ type: "Blog" as const, id })),
            ];
          }
        }
        return output;
      },
    }),
    getSingleBlog: build.query<
      Blog,
      { categorySlug: Category["slug"]; blogSlug: Blog["slug"] }
    >({
      query: ({ categorySlug, blogSlug }) =>
        `blogs/${categorySlug}/blog-detail/${blogSlug}`,
      providesTags: (result, error, args) => [
        { type: "Blog" as const, id: Object.values(args)[1] },
      ],
    }),

    getSearchResults: build.query<
      {
        searchBlogsResultForPagination: Blog[] | [];
        searchBlogsResultLength: number;
      },
      { searchData: string; startPosition: number; stopPosition: number }
    >({
      query: ({ searchData, startPosition, stopPosition }) =>
        `blogs/search?searchData=${searchData}&start=${startPosition}&stop=${stopPosition}`,
      providesTags: (result, error, arg) =>
        result
          ? Array.isArray(result)
            ? [
                ...result.map(({ id }) => ({ type: "Blog" as const, id })),
                { type: "Blog", id: "LIST" },
              ]
            : [{ type: "Blog" as const }]
          : [undefined],
    }),
    updateSingleBlog: build.mutation<Blog, any>({
      query: ({ blogSlug, ...data }) => {
        return {
          url: `blogs/blog-detail/${blogSlug}/update`,
          method: "PATCH",
          body: data.formData,
        };
      },
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: "Blog", id: arg.blogSlug }] : [{ type: "Blog" }],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetSingleBlogQuery,
  useGetSearchResultsQuery,
  useUpdateSingleBlogMutation,
} = blogApi;
