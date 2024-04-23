import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      //^ we are only querying the data not mutating it
      query: () => "/todos",
      //^ order the todos in descending manner using their id
      transformResponse: (res) =>
        res.sort((a, b) => {
          return b.id - a.id;
        }),
      //^ fetches the data each time the tag is invalidated
      providesTags: ["Todos"],
    }),
    addTodos: builder.mutation({
      //^ we are actually changing the data
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  //^ notice how all the below are mutations not queries
  useAddTodosMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
