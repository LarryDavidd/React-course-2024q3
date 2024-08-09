import useAppDispatch from '@/components/app/store/hooks/useAppDispatch';
import useAppSelector from '@/components/app/store/hooks/useAppSelector';
import { Item } from '@/components/entities/Cards';
import { clearFavorites } from '@/components/features/favorites/favorite.slice';
import { IResponse } from '@/components/shared/types/types';
import { SimpleButton } from '@/components/shared/ui-kits/buttons';
import React from 'react';

const FavoritesModal: React.FC = () => {
  const { favorites } = useAppSelector((state) => state.favoriteSlice);
  const dispatch = useAppDispatch();

  const getDownloadUrl = () => {
    const csvContent = generateCSVContentForResponse(favorites);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = URL.createObjectURL(blob);
    return url;
  };

  return (
    <div className="fixed inset-y-1/2 h-min w-fit">
      <div className="relative max-h-full w-fit p-4">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Favorites</h3>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{favorites.length} - selected</h3>
          <SimpleButton
            buttonDetails={{ name: 'clear favorites' }}
            onClick={() => dispatch(clearFavorites())}
          />
          <a
            href={getDownloadUrl()}
            download={`${favorites.length}_characters.csv`}
            aria-label="download"
          >
            <SimpleButton buttonDetails={{ name: 'Download', isDisabled: favorites.length < 1 }} />
          </a>
          <div className="h-96 overflow-x-hidden">
            {favorites.map((character: IResponse) => (
              <Item
                character={character}
                key={character.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;

export function generateCSVContentForResponse(characters: IResponse[]): string {
  const headers = ['ID', 'Name', 'Status', 'Gender', 'Image', 'Species', 'Location'];

  const rows = characters.map((character) => [
    character.id.toString(),
    character.name || '',
    character.status || '',
    character.gender || '',
    character.image || '',
    character.species || '',
    character.location.name || ''
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  return csvContent;
}
