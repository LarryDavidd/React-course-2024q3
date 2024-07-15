import React, { createContext, ReactNode, useState } from 'react';
import getCardsInfo from '../api/getCardsInfo';
import getSingleCardsInfo from '../api/getSingleCardIndo';
import { IResponse } from '@shared/types/types';
import { UseLocalStorage } from '@shared/lib';

export type CardContextType = {
  lastInputValue: string;
  res: IResponse[];
  singleRes: IResponse | null;
  isLoading: boolean;
  isSingleLoading: boolean;
  requestCardInfo: (newData: string[]) => void;
  requestSingleCardInfo: (id: string) => void;
  setIsLoading: (newData: boolean) => void;
  setIsSingleLoading: (newData: boolean) => void;
};

type CardContextProps = {
  children?: ReactNode;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

const DataProvider: React.FC<CardContextProps> = ({ children }) => {
  const [lastInputValue, setLastInputValue] = useState<string>('');
  const [res, setRes] = useState<IResponse[]>([]);
  const [singleRes, setSingleRes] = useState<IResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSingleLoading, setIsSingleLoading] = useState<boolean>(true);

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

  const requestSingleCardInfo = async (id: string) => {
    setIsSingleLoading(true);
    const res = await getSingleCardsInfo(id);

    if (res instanceof Error) {
      setSingleRes(null);
    } else {
      console.log(res);
      setSingleRes(res);
    }

    setIsSingleLoading(false);
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
        singleRes,
        isLoading,
        isSingleLoading,
        requestCardInfo,
        requestSingleCardInfo,
        setIsLoading,
        setIsSingleLoading
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export { CardContext, DataProvider };
