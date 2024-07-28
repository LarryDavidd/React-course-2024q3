import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { Item } from '@entities/Cards';
import { ItemList } from '@entities/Cards';
import { PageSpinner } from '@shared/ui-kits/spinner';
import NotFoundSection from '@shared/ui-kits/sections';
import { IResponse } from '@shared/types/types';
import { UseLocalStorage } from '@shared/lib';
import { Pagination } from '@/shared/ui-kits/navigation';
import { MainHeader } from '@/widgets/MainHeader';
import { setCurrentPage, setData, setLoadingCards, setSaveText } from '@/entities/Cards/slice/search.slice';
import useAppDispatch from '@/app/store/hooks/useAppDispatch';
import useAppSelector from '@/app/store/hooks/useAppSelector';
import { useGetCardsInfoQuery } from '@/entities/Cards/api/cardApi';
import { DEFAULT_PAGE, LOCAL_STORAGE_KEY } from '@/shared/constants/constats';
import { Dispatch } from '@reduxjs/toolkit';

const myThunk = (inputValue: string, currentPage: number) => (dispatch: Dispatch) => {
  dispatch(setSaveText(inputValue));
  dispatch(setCurrentPage(currentPage));
};

const MainPage: React.FC = () => {
  const useLocalStorage = UseLocalStorage();
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { inputValue, currentPage } = useAppSelector((state) => state.searchSlice);
  const { data, isFetching } = useGetCardsInfoQuery(
    {
      inputValue,
      page: currentPage
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    dispatch(myThunk(useLocalStorage.load(LOCAL_STORAGE_KEY) ?? '', searchParams.has('page') ? Number(searchParams.get('page')) : DEFAULT_PAGE));
  }, []);

  useEffect(() => {
    dispatch(setData({ value: data?.results }));
    dispatch(setLoadingCards({ value: isFetching }));
  }, [data]);

  const setNewCurrentPage = (number: number) => {
    if (number > 0 && number <= (data?.info.pages ?? DEFAULT_PAGE)) {
      setSearchParams({ page: String(number) });
      dispatch(setCurrentPage(number));
    }
  };

  const renderItems = () => {
    if (isFetching) {
      return <PageSpinner />;
    } else if (data) {
      return (
        <>
          <MainHeader />
          <div className="m-6 flex justify-center">
            <Pagination
              onClick={setNewCurrentPage}
              currentPage={currentPage}
            />
          </div>
          <main className="flex">
            <ItemList>
              {data.results.map((character: IResponse) => (
                <Link
                  key={character.id}
                  to={`/${character.id}${search}`}
                >
                  <Item character={character} />
                </Link>
              ))}
            </ItemList>
            <Outlet />
          </main>
        </>
      );
    } else {
      return (
        <section>
          <NotFoundSection />
        </section>
      );
    }
  };

  return renderItems();
};

export default MainPage;
