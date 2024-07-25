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
  currentPage: number;
  pagesCount: number;
  requestCardInfo: (newData: string[], currentPage?: number | undefined) => void;
  requestSingleCardInfo: (id: string) => void;
  setIsLoading: (newData: boolean) => void;
  setIsSingleLoading: (newData: boolean) => void;
  setCurrentPage: (currentPage: number) => void;
  requestGetNextPage: () => void;
  requestGetPrevPage: () => void;
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(1);

  const localStorage = UseLocalStorage();

  const requestGetNextPage = async () => {
    setIsLoading(true);
    const res = await getCardsInfo([`name=${lastInputValue}`], currentPage);

    if (res instanceof Error) {
      setRes([]);
    } else {
      setRes(res.results);
    }

    setIsLoading(false);
  };

  const requestGetPrevPage = async () => {
    if (currentPage > 1) {
      setIsLoading(true);
      const res = await getCardsInfo([`name=${lastInputValue}`], currentPage);

      if (res instanceof Error) {
        setRes([]);
      } else {
        setRes(res.results);
      }

      setIsLoading(false);
    }
  };

  const requestCardInfo = async (queryArgs: string[], currentPage: number | undefined = undefined) => {
    setIsLoading(true);
    const res = await getCardsInfo(queryArgs, currentPage);

    if (res instanceof Error) {
      setRes([]);
    } else {
      setRes(res.results);
      setPagesCount(res.info.pages);
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
      setSingleRes(res);
    }

    setIsSingleLoading(false);
  };

  const setNewSerchRequest = (newSearchRequest: string) => {
    setLastInputValue(newSearchRequest);
    localStorage.set('searchRequest', newSearchRequest);
  };

  return (
    <CardContext.Provider
      value={{
        lastInputValue,
        res,
        singleRes,
        isLoading,
        isSingleLoading,
        currentPage,
        pagesCount,
        requestCardInfo,
        requestSingleCardInfo,
        setIsLoading,
        setIsSingleLoading,
        setCurrentPage,
        requestGetNextPage,
        requestGetPrevPage
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export { CardContext, DataProvider };
