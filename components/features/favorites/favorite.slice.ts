import { IResponse } from '@/components/shared/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FavoriteState = {
  favorites: IResponse[];
};

const initialState: FavoriteState = {
  favorites: []
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    toggleItemInFavorite: (state, action: PayloadAction<IResponse>) => {
      const index = state.favorites.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },
    clearFavorites: (state) => {
      state.favorites = [];
    }
  }
});

export const { toggleItemInFavorite, clearFavorites } = searchSlice.actions;

export default searchSlice.reducer;
