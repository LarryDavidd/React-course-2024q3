import React, { MouseEvent } from 'react';
import { IResponse } from '@/components/shared/types/types';
import { SimpleButton } from '@/components/shared/ui-kits/buttons';
import useAppDispatch from '@/components/app/store/hooks/useAppDispatch';
import { toggleItemInFavorite } from '@/components/features/favorites/favorite.slice';
import useAppSelector from '@/components/app/store/hooks/useAppSelector';

type ItemProps = {
  character: IResponse;
};

const Item: React.FC<ItemProps> = ({ character }) => {
  const dispatch = useAppDispatch();
  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(toggleItemInFavorite(character));
  };

  const { favorites } = useAppSelector((state) => state.favoriteSlice);

  const isExist = () => favorites.findIndex((item) => item.id === character.id) !== -1;

  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <img
        className="rounded-t-lg"
        src={character.image}
        alt={character.name}
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{character.name}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Status: {character.status}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Gender: {character.gender}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Species: {character.species}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Location: {character.location.name}</p>
        <SimpleButton
          buttonDetails={{ name: isExist() ? 'remove from favorites' : 'add to favorite' }}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Item;
