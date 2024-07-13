import React, { useContext } from 'react';
import { CardContextType, CardContext } from '@entities/Cards';
import { Item } from '@entities/Cards';
import { ItemList } from '@entities/Cards';
import { PageSpinner } from '@shared/ui-kits/spinner';
import NotFoundSection from '@shared/ui-kits/sections';
import { IResponse } from '@shared/types/types';

const MainPage: React.FC = () => {
  const context = useContext<CardContextType | undefined>(CardContext);

  const renderItems = () => {
    if (context?.isLoading) {
      return <PageSpinner />;
    }

    if (context && context?.res.length > 0) {
      return (
        <ItemList>
          {context.res.map((character: IResponse) => (
            <Item
              key={character.id}
              character={character}
            />
          ))}
        </ItemList>
      );
    } else {
      return (
        <section>
          <NotFoundSection />
        </section>
      );
    }
  };

  return <>{renderItems()}</>;
};

export default MainPage;
