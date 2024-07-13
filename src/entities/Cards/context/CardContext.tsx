import React, { createContext, ReactNode, useState } from 'react';
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

const CardContext = createContext<CardContextType | undefined>(undefined);

const DataProvider: React.FC<CardContextProps> = ({ children }) => {
  const [lastInputValue, setLastInputValue] = useState<string>('');
  const [res, setRes] = useState<IResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const requestCardInfo = async (queryArgs: string[]) => {
    setIsLoading(true);
    const res = await getCardsInfo(queryArgs);

    if (res instanceof Error) {
      setRes([]);
    } else {
      setRes(res.results);
    }

    const queryArg = queryArgs.find((value) => value.includes('name='));
    if (queryArg) setNewSerchRequest(queryArg.replace('name=', ''));
    setIsLoading(false);
  };

  const setNewSerchRequest = (newSearchRequest: string) => {
    setLastInputValue(newSearchRequest);
    UseLocalStorage.getInstance().set('searchRequest', newSearchRequest);
  };

  return (
    <CardContext.Provider
      value={{
        lastInputValue,
        res,
        isLoading,
        requestCardInfo,
        setLoading: setIsLoading
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export { CardContext, DataProvider };
