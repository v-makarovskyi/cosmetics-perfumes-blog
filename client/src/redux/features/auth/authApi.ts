import { perfumesBlogApi } from "@src/redux/api/perfumesBlogApi";
import { User } from "types/main";

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
  }),
});

export const { useRegisterUserMutation } = authApi;
