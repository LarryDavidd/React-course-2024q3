import React, { ReactNode } from 'react';
import { IResponse, IResult } from '@shared/types/types';
import { DEFAULT_PAGE } from '@shared/constants/constats';
import NotFoundSection from '@shared/ui-kits/sections';
import { MainHeader } from '@widgets/MainHeader';
import { Pagination } from '@shared/ui-kits/navigation';
import { Item, ItemList } from '@entities/Cards';
import { useSearchParams } from '@remix-run/react';

type MainPageProps = {
  data?: IResult;
  children?: ReactNode;
};

const MainPage: React.FC<MainPageProps> = ({ data, children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const changeUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', String(page));
    setSearchParams(params);
  };

  const numberOfPage = Number(searchParams.get('page')) || DEFAULT_PAGE;

  const renderItems = () => {
    if (data) {
      return (
        <>
          <MainHeader />
          <div className="m-6 flex justify-center">
            <Pagination
              onClick={changeUrl}
              currentPage={numberOfPage}
            />
          </div>
          <main className="flex">
            <ItemList>
              {data.results.map((character: IResponse) => (
                <Item
                  character={character}
                  key={character.id}
                />
              ))}
            </ItemList>
            {children ?? null}
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
