import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://213.171.5.191:3002/api",
  prepareHeaders: (headers, { getState }) => {
    const token = Cookies.get('token')//Получаем токен из хранилища

// Если у нас есть токен, установленный в состоянии, давайте предположим, что мы должны его передать.
    if (token) {//Эгерде Coockie токен барболсо анан авторизация кыл(getMe кошо кетет)
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

// создаем api const потом от нее запрос сделаем настройка
export const api = createApi({
  // называния любого 
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});