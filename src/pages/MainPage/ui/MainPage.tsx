import { Component } from 'react';
import { CardContextType, CardContext } from '@entities/Cards';
import { Item } from '@entities/Cards';
import { ItemList } from '@entities/Cards';
import { PageSpinner } from '@shared/ui-kits/spinner';
import NotFoundSection from '@shared/ui-kits/sections';
import { IResponse } from '@shared/types/types';

export default class MainPage extends Component {
  renderItems(context: CardContextType | undefined) {
    if (context?.isLoading) {
      return <PageSpinner />;
    }
    return context?.res ? (
      <ItemList>
        {context.res.map((character: IResponse) => (
          <Item
            key={character.id}
            character={character}
          />
        ))}
      </ItemList>
    ) : (
      <section>
        <NotFoundSection />
      </section>
    );
  }

  render(): JSX.Element {
    return <CardContext.Consumer>{(context) => this.renderItems(context)}</CardContext.Consumer>;
  }
}
