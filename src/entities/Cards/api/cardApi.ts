import { IResponse, IResult } from '@/components/shared/types/types';
import { config } from '@/components/shared/api/config/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type CardQueryParams = {
  inputValue?: string;
  page?: number | string;
};

export const cardApi = createApi({
  reducerPath: 'data',
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }),
  endpoints: (builder) => ({
    getCardsInfo: builder.query<IResult, CardQueryParams>({
      query: ({ page, inputValue }) => `/?page=${page ?? ''}&name=${inputValue ?? ''}`,
      transformResponse: (response: IResult) => response
    }),
    searchCard: builder.query<IResponse, string>({
      query: (id: string) => id,
      transformResponse: (response: IResponse) => response
    })
  })
});

export const { useGetCardsInfoQuery, useSearchCardQuery } = cardApi;
