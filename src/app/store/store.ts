import { formsSlice } from '@/entities/CardsFromForm';
import countrySlice from '@/shared/slices/country.slice';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  formsSlice,
  countrySlice
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
