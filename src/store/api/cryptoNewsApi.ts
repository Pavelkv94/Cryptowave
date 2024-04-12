import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { buildPriorDate } from "../../utils/buildPriorDate";
import { INewsArticle } from "../../types/coins.types";

const cryptoNewsApiHeaders = {};

const baseUrl = "https://newsapi.org/v2";

const getRequest = (url: string) => ({ url, headers: cryptoNewsApiHeaders });

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
            query: ({ newsCategory }) =>
                getRequest(`/everything?q=${newsCategory}&from=${buildPriorDate()}&sortBy=publishedAt&apiKey=${import.meta.env.VITE_NEWSAPI_KEY}&language=en`)
        })
    })
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;
