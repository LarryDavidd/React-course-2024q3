import { Component, createContext, ReactNode } from 'react';
import getCardsInfo from '../api/getCardsInfo';
import { IResponse } from '@shared/types/types';
import { UseLocalStorage } from '@shared/lib';

export type CardContextType = {
  lastInputValue: string;
  res: IResponse[];
  isLoading: boolean;
  requestCardInfo: (newData: string[]) => void;
  setLoading: (newData: boolean) => void;
};

type CardContextProps = {
  children?: ReactNode;
};

type CardContextState = {
  lastInputValue: string;
  res: IResponse[];
  isLoading: boolean;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

class DataProvider extends Component<CardContextProps, CardContextState> {
  constructor(props: CardContextProps) {
    super(props);

    this.state = {
      lastInputValue: '',
      res: [],
      isLoading: true
    };
  }

  requestCardInfo = async (queryArgs: string[]) => {
    this.setState({ isLoading: true });
    const res = await getCardsInfo(queryArgs);
    this.setState({ isLoading: false });

    if (res instanceof Error) {
      this.setNewRes([]);
    } else {
      this.setNewRes(res.results);
    }

    const queryArg = queryArgs.find((value) => value.includes('name='));
    if (queryArg) this.setNewSerchRequest(queryArg.replace('name=', ''));
  };

  setNewRes = (newRes: IResponse[]) => {
    this.setState({
      res: newRes
    });
  };

  setNewSerchRequest = (newSearchRequest: string) => {
    this.setState({ lastInputValue: newSearchRequest });
    UseLocalStorage.getInstance().set('searchRequest', newSearchRequest);
  };

  setLoading = (isLoading: boolean) => {
    this.setState({
      isLoading
    });
  };

  render() {
    const { res, isLoading, lastInputValue } = this.state;
    const { children } = this.props;

    return (
      <CardContext.Provider
        value={{
          lastInputValue,
          res,
          isLoading,
          requestCardInfo: this.requestCardInfo,
          setLoading: this.setLoading
        }}
      >
        {children}
      </CardContext.Provider>
    );
  }
}

export { CardContext, DataProvider };
