import { MainPage } from '@pages/MainPage';
import { getCardsInfo } from '@entities/Cards/api/cardApi';
import { DEFAULT_PAGE } from '@shared/constants/constats';
import { IResult } from '@shared/types/types';
import { store } from '@app/store/Provider';

// Функция для получения данных на сервере
async function fetchData(value: string = '', page: string = String(DEFAULT_PAGE)) {
  const result = await store.dispatch(
    getCardsInfo.initiate({
      inputValue: value,
      page: page
    })
  );

  return result.data as IResult;
}

// Серверный компонент для рендеринга страницы
export default async function Page({ searchParams }: { searchParams: { value?: string; page?: string } }) {
  const data = await fetchData(searchParams.value, searchParams.page);

  // Передача данных в клиентский компонент MainPage
  return <MainPage data={data} />;
}
