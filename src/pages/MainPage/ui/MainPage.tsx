import React, { useContext } from 'react';
import { CardContextType, CardContext } from '@entities/Cards';
import { Item } from '@entities/Cards';
import { ItemList } from '@entities/Cards';
import { PageSpinner } from '@shared/ui-kits/spinner';
import NotFoundSection from '@shared/ui-kits/sections';
import { IResponse } from '@shared/types/types';
import { Link, Outlet, useLocation } from 'react-router-dom';

const MainPage: React.FC = () => {
  const context = useContext<CardContextType | undefined>(CardContext);
  const { search } = useLocation();

  const renderItems = () => {
    if (context?.isLoading) {
      return <PageSpinner />;
    }

    if (context && context?.res.length > 0) {
      return (
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
