//import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { api } from './settings';

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({//баарык поссту чыгарат
      query: () => ({
        // endpoints например роутер апишка
        url: '/posts'
      })
    }),
    getAllPostsMe: builder.query({//именно авторизаванныйлар чыгат
      query: () => ({
        // http://213.171.5.191:3002/api
        url: '/posts/user/me', // endpoint
      })
    }),
    getPost: builder.query({//детальный пост
      query: (id) => ({
        url: `/posts/${id}`,
      })
    }),
    createPost: builder.mutation({//баарык поссту чыгарат
      query: (post) => ({
        // query: (post) - параметр телодон келет
        url: '/posts',
        method: 'POST',
        body: post,
      })
    }),
    removePost: builder.mutation({//баарык поссту чыгарат
      query: (id) => ({
        // query: (post) - параметр телодон келет
        url: `/posts/${id}`,
        method: 'DELETE',
        body: id,
      })
    }),
  })
});

//  отравляет rootReducer -> store  -> UI 
export const { endpoints: { getAllPosts, getPost, getAllPostsMe, createPost, removePost } } = postApi;