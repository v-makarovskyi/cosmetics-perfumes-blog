import { perfumesBlogApi } from "../api/perfumesBlogApi";

export const uploadImageApi = perfumesBlogApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    uploadUserProfileImage: builder.mutation<{[x: string]: any}, FileList>({
      query: (data) => ({
        url: "upload",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadUserProfileImageMutation } = uploadImageApi;
