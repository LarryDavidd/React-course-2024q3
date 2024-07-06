import { Component } from 'react';
import HeaderSearchBar from '@features/HeaderSearchBar';
import { CardContext, CardContextType } from '@entities/Cards/context/CardContext';
import { UseLocalStorage } from '@shared/lib';

export default class MainHeader extends Component {
  onSearch = (text: string) => {
    const { requestCardInfo } = this.context as CardContextType;
    requestCardInfo([`name=${text}`]);
  };

  componentDidMount() {
    const { requestCardInfo } = this.context as CardContextType;
    const value = UseLocalStorage.getInstance().load('searchRequest');
    if (value) {
      requestCardInfo([`name=${String(value)}`]);
    } else {
      requestCardInfo([]);
    }
  }

  render() {
    const { lastInputValue } = this.context as CardContextType;

    return (
      <header className="flex min-h-20 w-full flex-col justify-center px-4 py-2 md:px-10">
        <HeaderSearchBar
          onSearch={this.onSearch}
          value={lastInputValue}
        />
      </header>
    );
  }
}

MainHeader.contextType = CardContext;
