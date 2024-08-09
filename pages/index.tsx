import { FC } from 'react';
import Head from 'next/head';

import { wrapper } from '@/components/app/store/store';
import { DEFAULT_PAGE } from '@/components/shared/constants/constats';
import { IResult } from '@/components/shared/types/types';
import { MainPage } from '@/components/pages/MainPage';
import { getCardsInfo, getRunningQueriesThunk } from '@/components/entities/Cards/api/cardApi';

type HomeProps = {
  data: IResult | undefined;
};

const Home: FC<HomeProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Week 5</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <MainPage data={data}></MainPage>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { value, page } = context.query;

  store.dispatch(
    getCardsInfo.initiate({
      inputValue: (value as string) ?? '',
      page: (page as string) ?? String(DEFAULT_PAGE)
    })
  );

  const [res] = await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      data: res.data
    }
  };
});

export default Home;
