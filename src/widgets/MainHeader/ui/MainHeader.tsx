import React, { useContext } from 'react';
import HeaderSearchBar from '@features/HeaderSearchBar';
import { CardContext, CardContextType } from '@entities/Cards/context/CardContext';
import { useLocalStorage } from '@shared/lib';
import ErrorButton from '@shared/components/ErrorButton';

const MainHeader: React.FC = () => {
  const context = useContext(CardContext);
  const { requestCardInfo } = context as CardContextType;

  const localStorage = useLocalStorage();

  const onSearch = (text: string) => {
    requestCardInfo([`name=${text}`]);
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
