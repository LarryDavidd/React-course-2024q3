import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { DEFAULT_PAGE, LOCAL_STORAGE_KEY } from '@/components/shared/constants/constats';
import { UseLocalStorage } from '@/components/shared/lib';
import { useSearchParams } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useCardSearch from '@/components/entities/Cards/slice/hooks/useCardSearch';
import { setCurrentPage, setSaveText } from '@/components/entities/Cards/slice/search.slice';
import '@testing-library/jest-dom';

vi.mock('@/components/shared/lib', () => ({
  UseLocalStorage: vi.fn()
}));

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn()
}));

const mockStore = configureStore([]);

interface MockSearchParamsResult {
  0: URLSearchParams;
  1: (params: URLSearchParams | Record<string, string>, options?: { replace?: boolean; state?: Record<string, unknown> }) => void;
}

describe('useCardSearch', () => {
  let store: MockStoreEnhanced;
  let setItemMock: vi.Mock;
  let getItemMock: vi.Mock;
  let removeItemMock: vi.Mock;
  let mockSearchParams: MockSearchParamsResult;

  beforeEach(() => {
    store = mockStore({});
    setItemMock = vi.fn();
    getItemMock = vi.fn();
    removeItemMock = vi.fn();
    mockSearchParams = [new URLSearchParams(), vi.fn()];

    (UseLocalStorage as vi.Mock).mockReturnValue({
      set: setItemMock,
      get: getItemMock,
      remove: removeItemMock
    });

    (useSearchParams as vi.Mock).mockReturnValue(mockSearchParams);
  });

  it('should set search parameters and dispatch actions', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>;

    const { result } = renderHook(() => useCardSearch(), { wrapper });

    act(() => {
      result.current.getAllCards('Rick');
    });

    expect(setItemMock).toHaveBeenCalledWith(LOCAL_STORAGE_KEY, 'Rick');
    // expect(mockSearchParams[1]).toHaveBeenCalledWith({ page: String(DEFAULT_PAGE) });
    expect(store.getActions()).toEqual([setSaveText('Rick'), setCurrentPage(DEFAULT_PAGE)]);
  });
});
