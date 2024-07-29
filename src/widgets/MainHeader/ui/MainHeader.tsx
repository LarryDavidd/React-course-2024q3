import React, { useEffect, useState } from 'react';
import HeaderSearchBar from '@features/HeaderSearchBar';
import { UseLocalStorage } from '@shared/lib';
import ErrorButton from '@shared/components/ErrorButton';
import useCardSearch from '@entities/Cards/slice/hooks/useCardSearch';
import { SimpleButton } from '@/shared/ui-kits/buttons';
import { useTheme } from '@/shared/context/themeProvider';
import FavoritesModal from '@/widgets/FavoritesModal/ui/FavoritesModal';
import useAppSelector from '@/app/store/hooks/useAppSelector';

const MainHeader: React.FC = () => {
  const { getAllCards } = useCardSearch();

  const localStorage = UseLocalStorage();

  const { favorites } = useAppSelector((state) => state.favoriteSlice);

  const onSearch = (text: string) => {
    getAllCards(text);
  };

  const [isModalOpen, openCloseModal] = useState(false);

  useEffect(() => {
    if (favorites.length > 0) openCloseModal(true);
    else openCloseModal(false);
  }, [favorites.length]);

  const theme = useTheme();

  const lastInputValue = localStorage.load('searchRequest');

  return (
    <header className="flex min-h-20 w-full flex-col justify-center gap-5 px-4 py-2 md:px-10">
      <HeaderSearchBar
        onSearch={onSearch}
        value={lastInputValue ? String(lastInputValue) : ''}
      />
      <ErrorButton />
      <SimpleButton
        buttonDetails={{ name: 'switch theme' }}
        onClick={theme.toggleTheme}
      />

      {isModalOpen ? <FavoritesModal /> : null}
    </header>
  );
};

export default MainHeader;
