import { perfumesBlogApi } from "@src/redux/api/perfumesBlogApi";
import type { User } from "@client_types/clientTypes";
import { userLoggedIn, userLoggedOut } from "./authSlice";

export const authApi = perfumesBlogApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    registerUser: builder.mutation<User, Partial<User["userData"]>>({
      query: (data) => ({
        url: `auth/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation<
      { message: string; id: string; name: string },
      Partial<User["userData"]>
    >({
      query: (data) => ({
        url: `auth/login`,
        method: "POST",
        body: data,
      }),
      transformResponse: (
        response: { message: string; id: string; name: string },
        meta,
        args
      ) => {

        return {
          ...response,
          name: (response.name =
            response.name[0].toUpperCase() +
            response.name.slice(1).toLowerCase()),
        };
      },
    }),
    logoutUser: builder.mutation<User, void>({
      query: () => ({
        url: `auth/logout`,
        method: "POST",
        body: {},
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result) {
            dispatch(userLoggedOut());
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
