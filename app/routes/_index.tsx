import { CardDetails } from '@/components/pages/CardDetails';
import { MainPage } from '@/components/pages/MainPage';
import { config } from '@/components/shared/api/config/config';
import { IResponse, IResult } from '@/components/shared/types/types';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import '@app/styles/tailwind.scss';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const search = searchParams.get('query') || '';
  const page = searchParams.get('page') || '';
  const details = searchParams.get('details') || '';

  const response = await fetch(config.baseUrl + `/?value=${search}&page=${page}`);

  const res = await response.json();

  if (details) {
    const detailsResponse = await fetch(config.baseUrl + '/' + details);
    const singleRes = await detailsResponse.json();

    return {
      cards: res as IResult,
      singleCard: singleRes as IResponse
    };
  }

  return { cards: res as IResult, singleCard: null };
};

export default function Index() {
  const { cards, singleCard } = useLoaderData<typeof loader>();

  return <MainPage data={cards}>{singleCard ? <CardDetails data={singleCard}></CardDetails> : null}</MainPage>;
}
