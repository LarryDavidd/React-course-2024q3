import React, { MouseEvent } from 'react';
import { IResponse } from '@shared/types/types';
import { SimpleButton } from '@shared/ui-kits/buttons';
import useAppDispatch from '@app/store/hooks/useAppDispatch';
import { toggleItemInFavorite } from '@features/favorites/favorite.slice';
import useAppSelector from '@app/store/hooks/useAppSelector';
import { useSearchParams } from '@remix-run/react';

type ItemProps = {
  character: IResponse;
};

const Item: React.FC<ItemProps> = ({ character }) => {
  const dispatch = useAppDispatch();
  const onClick = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleItemInFavorite(character));
  };

  const { favorites } = useAppSelector((state) => state.favoriteSlice);

  const isExist = () => favorites.findIndex((item) => item.id === character.id) !== -1;

  const [searchParams, setSearchParams] = useSearchParams();

  const changeUrl = () => {
    const params = new URLSearchParams(searchParams.toString());

    const prevDetailsId = params.get('details');

    if (!prevDetailsId || Number(prevDetailsId) !== character.id) {
      params.set('details', String(character.id));
      setSearchParams(params);
    }
  };

  return (
    <div
      className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
      onClick={changeUrl}
    >
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
