import { MainPage } from '@pages/MainPage';
import { DEFAULT_PAGE } from '@shared/constants/constats';
import { IResult } from '@shared/types/types';
import { config } from '@/components/shared/api/config/config';

async function getData(value: string = '', page: string = String(DEFAULT_PAGE)) {
  const response = await fetch(config.baseUrl + `/?value=${value}&page=${page}`);

  const res = await response.json();
  return res as IResult;
}

export default async function Page({ searchParams }: { searchParams: { value?: string; page?: string } }) {
  const { value, page } = searchParams;

  const data = await getData(value, page);

  return <MainPage data={data} />;
}
