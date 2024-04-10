import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_COINDESK_APIKEY,
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  'ngrok-skip-browser-warning': 'true' 
};

const baseUrl = "https://coinranking1.p.rapidapi.com"

const createRequest = (url:string) => ({url, headers: cryptoApiHeaders})

type PayloadType = {
    coinId: string;
     timePeriod: string;
}

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getCryptos: builder.query<any, null>({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query<string, null>({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query<null, PayloadType>({
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
