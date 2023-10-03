import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  "X-RapidAPI-Key": "b540e79f6cmsh9e255c98280ab3fp1c7507jsn8bb659aeb302",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com"

const createRequest = (url:string) => ({url, headers: cryptoApiHeaders})


export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        })
        // createCrypto: builder.mutation({
        //     query: (cryptoData) => createRequest('/coins', 'POST', cryptoData),
        //   }),
        //   updateCrypto: builder.mutation({
        //     query: ({ coinId, updatedData }) =>
        //       createRequest(`/coin/${coinId}`, 'PUT', updatedData),
        //   }),
        //   deleteCrypto: builder.mutation({
        //     query: (coinId) => createRequest(`/coin/${coinId}`, 'DELETE'),
        //   }),
    })
})

export const {
    useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery
} = cryptoApi;
