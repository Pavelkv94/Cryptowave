import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INewsArticle } from "../../types/coins.types";

const baseUrl = import.meta.env.VITE_SERVER_URL;

type PayloadType = {
    newsCategory: string;
    count: number;
};
type NewsArticleData = {
    articles: INewsArticle[];
};

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getCryptosNews: builder.query<NewsArticleData, PayloadType>({
            query: ({ newsCategory }) => `${baseUrl}/external/news?newsCategory=${newsCategory}`
        })
    })
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;
