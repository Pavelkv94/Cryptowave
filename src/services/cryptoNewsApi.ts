import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsApiHeaders = {

};

const baseUrl = "https://newsapi.org/v2";

const createRequest = (url: string) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getCryptosNews: builder.query({
            // query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}&setLang=ru`)

            //!google
            query: ({ newsCategory }) => createRequest(`/everything?q=${newsCategory}&from=2024-01-01&sortBy=publishedAt&apiKey=${import.meta.env.VITE_NEWSAPI_KEY}&language=en`)
        })
    })
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;
