import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsApiHeaders = {
    // 'X-BingApis-SDK': 'true',
    // 'X-RapidAPI-Key': 'b540e79f6cmsh9e255c98280ab3fp1c7507jsn8bb659aeb302',
    // 'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    //!google
    "X-RapidAPI-Key": "b540e79f6cmsh9e255c98280ab3fp1c7507jsn8bb659aeb302",
    "X-RapidAPI-Host": "google-news13.p.rapidapi.com"
};

// const baseUrl = 'https://bing-news-search1.p.rapidapi.com'
//!google
const baseUrl = "https://google-news13.p.rapidapi.com";

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
            query: ({ newsCategory, count }) => createRequest(`/search?keyword=${newsCategory}&lr=ru-RU`)
        })
    })
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;
