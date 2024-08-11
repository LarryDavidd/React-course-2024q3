import { MainPage } from '@pages/MainPage';
import { DEFAULT_PAGE } from '@shared/constants/constats';
import { IResponse, IResult } from '@shared/types/types';
import { config } from '@shared/api/config/config';
import { CardDetails } from '@pages/CardDetails';

async function getData(value: string = '', page: string = String(DEFAULT_PAGE), cardId: string) {
  const response = await fetch(config.baseUrl + `/?value=${value}&page=${page}`);

  const res = await response.json();

  const singleResponse = await fetch(config.baseUrl + '/' + cardId);

  const singleRes = await singleResponse.json();

  return { cards: res as IResult, singleCard: singleRes as IResponse };
}

export default async function Page({ params, searchParams }: { params: { slug: string }; searchParams: { value?: string; page?: string } }) {
  const { value, page } = searchParams;

  const data = await getData(value, page, params.slug);

  return (
    <MainPage data={data.cards}>
      <CardDetails data={data.singleCard}></CardDetails>
    </MainPage>
  );
}
