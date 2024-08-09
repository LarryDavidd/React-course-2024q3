import { describe, it, expect } from 'vitest';
import { DEFAULT_PAGE } from '@/components/shared/constants/constats';
import reducer, { setData, setSaveText, setLoadingCard, setLoadingCards, setCurrentPage } from '@/components/entities/Cards/slice/search.slice';

describe('searchSlice', () => {
  const initialState = {
    cardsInfo: [],
    inputValue: '',
    currentPage: DEFAULT_PAGE,
    isLoadingCards: false,
    isLoadingSingleCard: false
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setData', () => {
    const data = [{ id: 1, name: 'Rick Sanchez' }];
    expect(reducer(initialState, setData(data))).toEqual({
      ...initialState,
      cardsInfo: data
    });
  });

  it('should handle setSaveText', () => {
    const inputValue = 'Morty';
    expect(reducer(initialState, setSaveText(inputValue))).toEqual({
      ...initialState,
      inputValue
    });
  });

  it('should handle setCurrentPage', () => {
    const currentPage = 2;
    expect(reducer(initialState, setCurrentPage(currentPage))).toEqual({
      ...initialState,
      currentPage
    });
  });

  it('should handle setLoadingCards', () => {
    const isLoadingCards = true;
    expect(reducer(initialState, setLoadingCards(isLoadingCards))).toEqual({
      ...initialState,
      isLoadingCards
    });
  });

  it('should handle setLoadingCard', () => {
    const isLoadingSingleCard = true;
    expect(reducer(initialState, setLoadingCard(isLoadingSingleCard))).toEqual({
      ...initialState,
      isLoadingSingleCard
    });
  });
});
