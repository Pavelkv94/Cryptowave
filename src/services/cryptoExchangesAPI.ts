import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoExchangesApiHeaders = {
    'X-RapidAPI-Key': 'b540e79f6cmsh9e255c98280ab3fp1c7507jsn8bb659aeb302',
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
};

const baseUrl = 'https://coingecko.p.rapidapi.com'

const createRequest = (url:string) => ({url, headers: cryptoExchangesApiHeaders})


export const cryptoExchangesApi = createApi({
    reducerPath: 'cryptoExchangesApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getCryptosExchanges: builder.query({
            query: () => createRequest(`/exchanges`)
        })
    })
})

export const {
    useGetCryptosExchangesQuery
} = cryptoExchangesApi;
