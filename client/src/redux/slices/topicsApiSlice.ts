import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Topic, CreateTopicProps, UpdateTopicProps, TopicStatusProps, DeleteTopicProps } from '../../types/types';
export const topicsApiSlice = createApi({
    reducerPath: 'topicsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}`,
    }),
    endpoints: (builder) => ({
        getTopics: builder.query<Topic[], void>({
            query: () => '/topic/get',
        }),
        getTopicsByProfessorId: builder.query<Topic[], number>({
            query: (id) => `/topic/professor/${id}`,
        }),
        createTopic: builder.mutation<Topic, CreateTopicProps>({
            query: (newTopic) => ({
                url: '/topic/create',
                method: 'POST',
                body: newTopic,
            }),
        }),
        updateTopic: builder.mutation<Topic, UpdateTopicProps>({
            query: ({ id, userId }) => ({
                url: `/topic/update/${id}`,
                method: 'PUT',
                body: { studentUserId: userId },
            }),
        }),
        updateTopicStatus: builder.mutation<Topic, TopicStatusProps>({
            query: ({ id, professorId, topicStatus }) => ({
                url: `/topic/update/status/${id}`,
                method: 'PUT',
                body: { professorId, topicStatus },
            }),
        }),
        deleteTopic: builder.mutation<Topic, DeleteTopicProps>({
            query: ({ id, professorId }) => ({
                url: `/topic/delete/${id}`,
                method: 'DELETE',
                params: { professorId },
            }),
        }),
    }),
});
export const {
    useGetTopicsQuery,
    useGetTopicsByProfessorIdQuery,
    useCreateTopicMutation,
    useUpdateTopicMutation,
    useUpdateTopicStatusMutation,
    useDeleteTopicMutation
} = topicsApiSlice;