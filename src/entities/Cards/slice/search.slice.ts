import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_PAGE } from '@shared/constants/constats';

const initialState = {
  cardsInfo: [],
  inputValue: '',
  currentPage: DEFAULT_PAGE,
  isLoadingCards: false,
  isLoadingSingleCard: false
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.cardsInfo = action.payload;
    },
    setSaveText: (state, action) => {
      state.inputValue = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLoadingCards: (state, action) => {
      state.isLoadingCards = action.payload;
    },
    setLoadingCard: (state, action) => {
      state.isLoadingSingleCard = action.payload;
    }
  }
});

export const { setData, setSaveText, setLoadingCard, setLoadingCards, setCurrentPage } = searchSlice.actions;

export default searchSlice.reducer;
