import { FC } from 'react';

import { wrapper } from '@app/store/store';
import { DEFAULT_PAGE } from '@shared/constants/constats';
import { IResult } from '@shared/types/types';
import { MainPage } from '@pages/MainPage';
import { getCardsInfo, getRunningQueriesThunk } from '@entities/Cards/api/cardApi';

type HomeProps = {
  data: IResult | undefined;
};

const Home: FC<HomeProps> = ({ data }) => {
  return <MainPage data={data}></MainPage>;
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
