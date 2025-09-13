import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        logIn: builder.mutation({
            query: (LogInData) => ({
                url: '/auth/login',
                method: 'POST',
                body: LogInData,
            }),
        }),

        register: builder.mutation({
            query: (registerData) => ({
                url: '/auth/register',
                method: 'POST',
                body: registerData,
            }),
        }),

    }),
});

export const {
    useLogInMutation,
    useRegisterMutation
} = authApi;