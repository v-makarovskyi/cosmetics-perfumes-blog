import { perfumesBlogApi } from "../api/perfumesBlogApi";
import type { User, Blog } from "@client_types/clientTypes";
import moment from "moment";
import { userLoggedIn } from "./auth/authSlice";

export const userApi = perfumesBlogApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUserForStore: builder.query<Partial<User["userData"]>, true | null>({
      query: () => `users/get_user_for_store`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn(result.data));
        } catch (error) {
          console.error(error);
        }
      },
      providesTags: (result, error, id) => [
        { type: "User", id: "USER_FOR_STORE" },
      ],
    }),
    getUserProfile: builder.query<User["userData"], User["userData"]["id"]>({
      query: (id) => `users/profiles/${id}`,
      transformResponse: (response: User["userData"], meta, args) => {
        response = {
          ...response,
          created_at: moment(response.created_at).format("DD/MM/YYYY hh:mm"),
        };
        return response;
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        dispatch(userLoggedIn(result.data));
      },

      providesTags: (result, error, id) => [{ type: "User" as const, id: id }],
    }),
    updateUserProfile: builder.mutation<any, any>({
      query: ({ id, ...data }) => {
        return {
          url: `users/profiles/${id}/profile/update`,
          method: "POST",
          body: data.formData,
        };
      },
      transformErrorResponse: (response) => response,
      invalidatesTags: (result, error, { id }) =>
        result ? [{ type: "User", id }] : ["User"],
    }),
    addBlogToWishlist: builder.mutation<
      { message: string; userAddBlogsData: Partial<User["userData"]> },
      Blog["slug"]
    >({
      query: (blogSlug) => {
        return {
          url: `users/wishlist-add/${blogSlug}`,
          method: "POST",
          body: { blogSlug },
        };
      },
      async onQueryStarted(arg, { getState, dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          dispatch(userLoggedIn(res.data.userAddBlogsData));
        } catch (ignored) {}
      },
      invalidatesTags: (result, error, arg) => [
        { type: "User" as const, id: result?.userAddBlogsData.id },
      ],
    }),
    deleteBlogFromWishlist: builder.mutation<
      { message: string; userDeleteBlogsData: Partial<User["userData"]> },
      Blog["slug"]
    >({
      query: (blogSlug) => {
        return {
          url: `users/wishlist-delete/${blogSlug}`,
          method: "POST",
          body: { blogSlug },
        };
      },
      async onQueryStarted(arg, { getState, dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          dispatch(userLoggedIn(res.data.userDeleteBlogsData));
        } catch (ignored) {}
      },
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: result?.userDeleteBlogsData.id },
      ],
    }),
  }),
});

export const {
  useGetUserForStoreQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useAddBlogToWishlistMutation,
  useDeleteBlogFromWishlistMutation,
} = userApi;
