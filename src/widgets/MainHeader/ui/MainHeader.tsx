import React from 'react';
import HeaderSearchBar from '@features/HeaderSearchBar';
import { UseLocalStorage } from '@shared/lib';
import ErrorButton from '@shared/components/ErrorButton';
import useCardSearch from '@entities/Cards/slice/hooks/useCardSearch';

const MainHeader: React.FC = () => {
  const { getAllCards } = useCardSearch();

  const localStorage = UseLocalStorage();

  const onSearch = (text: string) => {
    getAllCards(text);
  };

  const lastInputValue = localStorage.load('searchRequest');

  return (
    <header className="flex min-h-20 w-full flex-col justify-center gap-5 px-4 py-2 md:px-10">
      <HeaderSearchBar
        onSearch={onSearch}
        value={lastInputValue ? String(lastInputValue) : ''}
      />
      <ErrorButton />
    </header>
  );
};

export default MainHeader;
