import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { CardContextType, CardContext } from '@entities/Cards';
import { Item } from '@entities/Cards';
import { ItemList } from '@entities/Cards';
import { PageSpinner } from '@shared/ui-kits/spinner';
import NotFoundSection from '@shared/ui-kits/sections';
import { IResponse } from '@shared/types/types';
import { useLocalStorage } from '@shared/lib';
import { Pagination } from '@/shared/ui-kits/navigation';

const MainPage: React.FC = () => {
  const context = useContext<CardContextType | undefined>(CardContext);
  const { search } = useLocation();
  const { requestCardInfo, pagesCount } = context as CardContextType;
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const localStorage = useLocalStorage();

  useEffect(() => {
    const pageCurrent = searchParams.get('page');
    if (pageCurrent) {
      setCurrentPage(Number(pageCurrent));
    } else {
      setSearchParams({ page: String(currentPage) });
    }

    const value = localStorage.load('searchRequest');
    if (value) {
      requestCardInfo([`name=${String(value)}`], Number(pageCurrent));
    } else {
      requestCardInfo([], Number(pageCurrent));
    }
  }, [searchParams]);

  const setNewCurrentPage = (number: number) => {
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
