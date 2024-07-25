import { IResponse } from '@shared/types/types';
import { config } from '@shared/api/config/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cardApi = createApi({
  reducerPath: 'data',
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }),
  endpoints: (builder) => ({
    getCardsInfo: builder.query<IResponse[], number>({
      query: (value: number) => `/?page=${value}`,
      transformResponse: (response: IResponse[]) => response
    }),
    searchCard: builder.query<IResponse, string>({
      query: (value: string) => `/${value}`,
      transformResponse: (response: IResponse) => response
    })
  })
});

export const { useGetCardsInfoQuery, useSearchCardQuery } = cardApi;

// export const { getCardsInfo, searchCard } = cardApi.endpoints;
