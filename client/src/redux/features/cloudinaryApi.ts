import { perfumesBlogApi } from "../api/perfumesBlogApi";

export const cloudinaryApi = perfumesBlogApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        uploadCloadinaryImage: builder.mutation<any, any>({
            query: (data) => ({
                url: 'cloudinary/add-image',
                method: "POST",
                body: data
            })
        })
    })
})

export const {  useUploadCloadinaryImageMutation } = cloudinaryApi

