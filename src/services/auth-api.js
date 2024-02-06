//import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { api } from './settings';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        // http://213.171.5.191:3002/api
        url: '/auth/register', // endpoint
        method: 'POST',
        body: data // request server data username password 
      })
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',//method body - get(query) запросто болбойт
        body: data // request server data username password Login.js чакырдык
      })
    }),
    // rest api
    getMe: builder.query({
      query: () => ({
        url: '/auth/me'
      })
    })
  })
});

//  отравляет rootReducer -> store  -> UI 
export const { endpoints: { login, register, getMe } } = authApi;