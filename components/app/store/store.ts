import { createWrapper } from 'next-redux-wrapper';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cardApi, searchSlice } from '@/components/entities/Cards';
import favoriteSlice from '@/components/features/favorites/favorite.slice';

const rootReducer = combineReducers({
  searchSlice,
  favoriteSlice,
  [cardApi.reducerPath]: cardApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardApi.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(setupStore);
