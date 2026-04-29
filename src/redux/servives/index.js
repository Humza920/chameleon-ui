import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from "js-cookie";

const API_BASE = "https://9shklwjh-5000.asse.devtunnels.ms"; // Based on the API documentation

// Base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE,
  prepareHeaders: (headers, { getState }) => {
    const token = Cookies.get("access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// Custom base query with 401 handling
const customBaseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  
  if (result.error?.status === 401) {
    Cookies.remove("access_token");
    window.location.reload();
  }
  
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  tagTypes: ['User', 'Chat', 'Feedback', 'FBComment', 'Stats', 'BotSettings'],
  endpoints: (builder) => ({
    // ============ AUTHENTICATION ============
    login: builder.mutation({
      query: (credentials) => ({
        url: '/admin/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => {
        if (response.access_token) {
          Cookies.set("access_token", response.access_token, { expires: 1 }); // 1 day expiry
        }
        return response;
      },
    }),

    getStats: builder.query({
      query: () => '/admin/stats',
      providesTags: ['Stats'],
    }),

    getTokenStats: builder.query({
      query: () => '/admin/token-stats',
      providesTags: ['Stats'],
    }),

    // ============ CONVERSATIONS / USERS ============
    getUsers: builder.query({
      query: () => '/admin/users',
      providesTags: ['User'],
      transformResponse: (response) => response?.data || [],
    }),

    searchUserConversation: builder.query({
      query: (userId) => `/admin/chats?limit=1&offset=0&search_user_id=${encodeURIComponent(userId)}`,
      transformResponse: (response) => {
        const firstMessage = (response?.data || [])[0];
        if (!firstMessage) return null;
        return {
          user_id: firstMessage.user_id || userId,
          last_message: firstMessage.message || "",
          last_message_time: firstMessage.timestamp || null,
        };
      },
    }),

    // ============ CHAT MESSAGES ============
    getChatMessages: builder.query({
      query: ({ userId, limit = 50, offset = 0 }) => 
        `/admin/chats?limit=${limit}&offset=${offset}&user_id=${encodeURIComponent(userId)}`,
      providesTags: (result, error, { userId }) => [{ type: 'Chat', id: userId }],
      transformResponse: (response) => ({
        messages: response?.data || [],
        total: response?.total || 0,
        hasMore: response?.has_more ?? (response?.data?.length === 50),
        nextOffset: (response?.data?.length || 0),
      }),
    }),

    getAllChats: builder.query({
      query: ({ limit = 20, offset = 0 }) => 
        `/admin/chats?limit=${limit}&offset=${offset}`,
      providesTags: ['Chat'],
      transformResponse: (response) => ({
        chats: response?.data || [],
        total: response?.total || 0,
        hasMore: response?.has_more ?? (response?.data?.length === 20),
      }),
    }),

    // ============ FEEDBACK ============
    getFeedback: builder.query({
      query: ({ limit = 20, offset = 0, ratings = '' }) => {
        const ratingsParam = ratings ? `&ratings=${ratings}` : '';
        return `/admin/feedback?limit=${limit}&offset=${offset}${ratingsParam}`;
      },
      providesTags: ['Feedback'],
      transformResponse: (response) => ({
        feedback: response?.data || [],
        total: response?.total || 0,
        hasMore: response?.has_more ?? (response?.data?.length === limit),
      }),
    }),

    getAllFeedback: builder.query({
      query: ({ offset = 0, ratings = '' }) => {
        const ratingsParam = ratings ? `&ratings=${ratings}` : '';
        return `/admin/feedback?limit=100&offset=${offset}${ratingsParam}`;
      },
      providesTags: ['Feedback'],
      transformResponse: (response) => ({
        feedback: response?.data || [],
        hasMore: response?.has_more ?? (response?.data?.length === 100),
      }),
    }),

    // ============ FACEBOOK COMMENTS ============
    getFBComments: builder.query({
      query: ({ 
        limit = 50, 
        offset = 0, 
        confidenceBucket = '', 
        readStatus = '', 
        searchQuery = '', 
        startDate = '', 
        endDate = '' 
      }) => {
        const params = new URLSearchParams();
        params.append('limit', limit);
        params.append('offset', offset);
        if (confidenceBucket) params.append('confidence_bucket', confidenceBucket);
        if (readStatus) params.append('read_status', readStatus);
        if (searchQuery) params.append('search_query', searchQuery);
        if (startDate) params.append('start_date', startDate);
        if (endDate) params.append('end_date', endDate);
        
        return `/admin/fb-comments?${params.toString()}`;
      },
      providesTags: ['FBComment'],
      transformResponse: (response) => ({
        comments: response?.data || [],
        total: response?.total || 0,
        hasMore: response?.has_more ?? (response?.data?.length === 50),
      }),
    }),

    markFBCommentAsRead: builder.mutation({
      query: (commentId) => ({
        url: `/admin/fb-comments/${encodeURIComponent(commentId)}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['FBComment'],
    }),

    deleteFBComment: builder.mutation({
      query: ({ commentId, deleteType = "both" }) => ({
        url: `/admin/fb-comments/${encodeURIComponent(commentId)}?delete_type=${deleteType}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FBComment'],
    }),

    // ============ BOT SETTINGS ============
    getBotSettings: builder.query({
      query: () => '/admin/bot-settings',
      providesTags: ['BotSettings'],
    }),

    updateBotSettings: builder.mutation({
      query: (settings) => ({
        url: '/admin/bot-settings',
        method: 'POST',
        body: settings,
      }),
      invalidatesTags: ['BotSettings'],
    }),
  }),
});

// Export hooks
export const {
  useLoginMutation,
  useGetStatsQuery,
  useGetTokenStatsQuery,
  useGetUsersQuery,
  useLazySearchUserConversationQuery,
  useGetChatMessagesQuery,
  useLazyGetChatMessagesQuery,
  useGetAllChatsQuery,
  useGetFeedbackQuery,
  useLazyGetAllFeedbackQuery,
  useGetFBCommentsQuery,
  useMarkFBCommentAsReadMutation,
  useDeleteFBCommentMutation,
  useGetBotSettingsQuery,
  useUpdateBotSettingsMutation,
} = api;