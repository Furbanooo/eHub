import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constant";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation } = userApi;