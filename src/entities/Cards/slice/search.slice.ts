import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_PAGE } from '@shared/constants/constats';

const initialState = {
  cardsInfo: [],
  inputValue: '',
  currentPage: DEFAULT_PAGE,
  isLoadingCharacters: false,
  isLoadingSingleCharacter: false
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSaveText: (state, action) => {
      state.inputValue = action.payload;
    }
  }
});

export const { setSaveText } = searchSlice.actions;

export default searchSlice.reducer;
