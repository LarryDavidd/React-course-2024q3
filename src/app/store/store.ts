import { cardApi, searchSlice } from '@entities/Cards';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  searchSlice,
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
