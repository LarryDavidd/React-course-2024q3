import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { CardContextType, CardContext } from '@entities/Cards';
import { Item } from '@entities/Cards';
import { ItemList } from '@entities/Cards';
import { PageSpinner } from '@shared/ui-kits/spinner';
import NotFoundSection from '@shared/ui-kits/sections';
import { IResponse } from '@shared/types/types';
import { UseLocalStorage } from '@shared/lib';
import { Pagination } from '@/shared/ui-kits/navigation';

const MainPage: React.FC = () => {
  const context = useContext<CardContextType | undefined>(CardContext);
  const { search } = useLocation();
  const { requestCardInfo, pagesCount } = context as CardContextType;
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams({ page: String(currentPage) });
    } else {
      setCurrentPage(Number(searchParams.get('page')));
    }

    const value = UseLocalStorage.getInstance().load('searchRequest');
    if (value) {
      requestCardInfo([`name=${String(value)}`], currentPage);
    } else {
      requestCardInfo([], currentPage);
    }
  }, [searchParams]);

  const setNewCurrentPage = (number: number) => {
    console.log(number, pagesCount);
    if (number > 0 && number <= pagesCount) {
      setSearchParams({ page: String(number) });
    }
  };

  const renderItems = () => {
    if (context?.isLoading) {
      return <PageSpinner />;
    }

    if (context && context?.res.length > 0) {
      return (
        <>
          <div className="m-6 flex justify-center">
            <Pagination
              onClick={setNewCurrentPage}
              currentPage={currentPage}
            />
          </div>
          <main className="flex">
            <ItemList>
              {context.res.map((character: IResponse) => (
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
