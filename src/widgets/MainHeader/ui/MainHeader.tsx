import { Component } from 'react';
import HeaderSearchBar from '@features/HeaderSearchBar';
import { CardContext, IResponse } from '@entities/Cards/context/CardContext';

// type MainHeaderProps = {};

// type MainHeaderState = {};

interface IContext {
  setNewRes: (newData: IResponse[]) => void;
  requestCardInfo: (newData: string[]) => void;
  setLoading: (newData: boolean) => void;
}

export default class MainHeader extends Component {
  onSearch = (text: string) => {
    const { requestCardInfo } = this.context as IContext;
    requestCardInfo([`name=${text}`]);
  };

  render() {
    return (
      <header className="flex min-h-20 w-full flex-col justify-center px-4 py-2 md:px-10">
        <HeaderSearchBar onSearch={this.onSearch} />
      </header>
    );
  }
}

MainHeader.contextType = CardContext;
