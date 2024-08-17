import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTheme } from '@/shared/context/themeProvider';
import { UseLocalStorage } from '@shared/lib';
import useCardSearch from '@entities/Cards/slice/hooks/useCardSearch';
import { MemoryRouter } from 'react-router-dom';
import { MainHeader } from '@/widgets/MainHeader';
import { reqestMockData } from '@/__mocks__';
import '@testing-library/jest-dom';
import { ButtonProps } from '@/shared/ui-kits/buttons/SimpleButton/SimpleButton';

const mockStore = configureStore([]);

vi.mock('@shared/context/themeProvider', () => ({
  useTheme: vi.fn()
}));

vi.mock('@shared/lib', () => ({
  UseLocalStorage: vi.fn()
}));

vi.mock('@entities/Cards/slice/hooks/useCardSearch', () => ({
  __esModule: true,
  default: vi.fn()
}));

vi.mock('@shared/components/ErrorButton', () => ({
  __esModule: true,
  default: () => <button>Error Button</button>
}));

vi.mock('@/shared/ui-kits/buttons', () => ({
  SimpleButton: ({ onClick, buttonDetails }: ButtonProps) => <button onClick={onClick}>{buttonDetails.name}</button>
}));

vi.mock('@/widgets/FavoritesModal/ui/FavoritesModal', () => ({
  __esModule: true,
  default: () => <div>Favorites Modal</div>
}));

describe('MainHeader', () => {
  let store: MockStoreEnhanced;
  const mockGetAllCards = vi.fn();
  const mockToggleTheme = vi.fn();
  const mockLoad = vi.fn().mockReturnValue('Rick');

  beforeEach(() => {
    store = mockStore({
      favoriteSlice: {
        favorites: []
      }
    });

    (useCardSearch as vi.Mock).mockReturnValue({
      getAllCards: mockGetAllCards
    });

    (useTheme as vi.Mock).mockReturnValue({
      toggleTheme: mockToggleTheme
    });

    (UseLocalStorage as vi.Mock).mockReturnValue({
      load: mockLoad
    });
  });

  it('should render without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainHeader />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('search')).toBeInTheDocument();
    expect(screen.getByText('Error Button')).toBeInTheDocument();
    expect(screen.getByText('switch theme')).toBeInTheDocument();
  });

  it('should call getAllCards on search', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainHeader />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByText('search');
    const form = input.closest('form');
    const button = form?.querySelector('button');
    fireEvent.change(input, { target: { value: 'Rick' } });
    if (button) fireEvent.click(button);

    expect(mockGetAllCards).toHaveBeenCalledWith('Rick');
  });

  it('should toggle theme on button click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainHeader />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByText('switch theme');
    fireEvent.click(button);

    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('should show favorites modal when favorites are present', async () => {
    store = mockStore({
      favoriteSlice: {
        favorites: [reqestMockData.results]
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainHeader />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => expect(screen.getByText('Favorites Modal')).toBeInTheDocument());
  });
});
