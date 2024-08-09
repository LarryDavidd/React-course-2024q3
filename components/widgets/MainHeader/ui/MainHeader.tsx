import React, { useEffect, useState } from 'react';
import HeaderSearchBar from '@features/HeaderSearchBar';
import ErrorButton from '@shared/components/ErrorButton';
import useCardSearch from '@entities/Cards/slice/hooks/useCardSearch';
import FavoritesModal from '@widgets/FavoritesModal/ui/FavoritesModal';
import useAppSelector from '@app/store/hooks/useAppSelector';

const MainHeader: React.FC = () => {
  const { favorites } = useAppSelector((state) => state.favoriteSlice);

  const { getAllCards } = useCardSearch();

  const onSearch = (text: string) => {
    getAllCards(text);
  };

  const [isModalOpen, openCloseModal] = useState(false);

  useEffect(() => {
    if (favorites.length > 0) openCloseModal(true);
    else openCloseModal(false);
  }, [favorites.length]);

  return (
    <header className="flex min-h-20 w-full flex-col justify-center gap-5 px-4 py-2 md:px-10">
      <HeaderSearchBar
        onSearch={onSearch}
        value={''}
      />
      <ErrorButton />

      {isModalOpen ? <FavoritesModal /> : null}
    </header>
  );
};

export default MainHeader;
