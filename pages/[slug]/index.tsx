import { FC } from 'react';

import { wrapper } from '@/components/app/store/store';

import { getCardsInfo, searchCard } from '@/components/entities/Cards/api/cardApi';
import { DEFAULT_PAGE } from '@/components/shared/constants/constats';
import { IResponse, IResult } from '@/components/shared/types/types';
import { MainPage } from '@/components/pages/MainPage';
import { CardDetails } from '@/components/pages/CardDetails';

type HomeProps = {
  data: {
    cards: IResult | undefined;
    singleCard: IResponse | undefined;
  };
};

const SingleCard: FC<HomeProps> = ({ data }) => {
  return (
    <MainPage data={data.cards}>
      <CardDetails data={data.singleCard}></CardDetails>
    </MainPage>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { value, page } = context.query;
  const { params } = context;

  if (!params || !params.slug) {
    return {
      notFound: true
    };
  }
  const { slug } = params;

  const cardsRequest = store.dispatch(
    getCardsInfo.initiate({
      inputValue: (value as string) ?? '',
      page: (page as string) ?? String(DEFAULT_PAGE)
    })
  );

  const singleCardRequest = store.dispatch(searchCard.initiate((slug as string) ?? ''));
  const [cardsRes, singleCardRes] = await Promise.all([cardsRequest, singleCardRequest]);

  return {
    props: {
      data: {
        cards: cardsRes.data,
        singleCard: singleCardRes.data ?? null
      }
    }
  };
});

export default SingleCard;
