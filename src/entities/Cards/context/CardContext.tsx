import { UseLocalStorage } from '@shared/lib';
import { Component, createContext, ReactNode } from 'react';
import getCardsInfo from '../api/getCardsInfo';

export type IResponse = {
  id: number;
  name: string;
  status: string;
  gender: string;
  image: string;
  species: string;
  location: {
    name: string;
  };
};

type CardContextType = {
  searchRequest: string;
  res: IResponse[];
  isLoading: boolean;
  setNewRes: (newData: IResponse[]) => void;
  requestCardInfo: (newData: string) => void;
  setLoading: (newData: boolean) => void;
};

type CardContextProps = {
  children?: ReactNode;
};

type CardContextState = {
  searchRequest: string;
  res: IResponse[];
  isLoading: boolean;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

class DataProvider extends Component<CardContextProps, CardContextState> {
  constructor(props: CardContextProps) {
    super(props);

    this.state = {
      searchRequest: '',
      res: [],
      isLoading: true
    };
  }

  requestCardInfo = async (queryArgs: string[]) => {
    this.setState({ isLoading: true });
    const res = await getCardsInfo(queryArgs);
    console.log(res);
    this.setState({ isLoading: false });
  };

  setNewRes = (newRes: IResponse[]) => {
    this.setState({
      res: newRes
    });
  };

  setNewSerchRequest = (newSearchRequest: string) => {
    this.setState({
      searchRequest: newSearchRequest
    });
  };

  setLoading = (isLoading: boolean) => {
    this.setState({
      isLoading
    });
  };

  componentDidMount() {
    const value = UseLocalStorage.getInstance().load('searchRequest');
    if (value) {
      this.requestCardInfo([`name=${String(value)}`]);
    }
  }

  render() {
    const { searchRequest, res, isLoading } = this.state;
    const { children } = this.props;

    return (
      <CardContext.Provider
        value={{
          searchRequest,
          res,
          isLoading,
          setNewRes: this.setNewRes,
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
