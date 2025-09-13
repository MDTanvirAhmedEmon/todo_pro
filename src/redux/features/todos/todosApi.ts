import { baseApi } from "../../api/baseApi";

const todosApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createTodo: builder.mutation({
            query: (data) => ({
                url: '/todos',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['todos']
        }),

        getTodo: builder.query({
            query: (params) => ({
                url: `/todos`,
                method: 'GET',
                params,
            }),
            providesTags: ['todos'],
        }),

        updateTodo: builder.mutation({
            query: ({ data, id }) => ({
                url: `/todos/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['todos']
        }),

        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['todos']
        }),
    }),
});

export const {
    useCreateTodoMutation,
    useGetTodoQuery,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = todosApi;