import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IExchanges } from '../../types/coins.types';

const cryptoExchangesApiHeaders = {
    'X-RapidAPI-Key': import.meta.env.VITE_EXCHANGES_APIKEY,
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
};

const baseUrl = 'https://coingecko.p.rapidapi.com'

const getRequest = (url:string) => ({url, headers: cryptoExchangesApiHeaders})



export const cryptoExchangesApi = createApi({
    reducerPath: 'cryptoExchangesApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getCryptosExchanges: builder.query<IExchanges[], null>({
            query: () => getRequest(`/exchanges`)
        })
    })
})

export const {
    useGetCryptosExchangesQuery
} = cryptoExchangesApi;
