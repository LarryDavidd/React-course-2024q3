import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useSearchCardQuery } from '@entities/Cards/api/cardApi'; // Подключаем тип
import { CardDetails } from '@/pages/CardDetails';
import '@testing-library/jest-dom';

// Создаем mock store
const mockStore = configureStore([]);

const initialState = {
  favoriteSlice: {
    favorites: []
  }
};

// Мокаем useSearchCardQuery хук
vi.mock('@entities/Cards/api/cardApi', () => ({
  useSearchCardQuery: vi.fn()
}));

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  location: { name: 'Citadel of Ricks' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
};

describe('CardDetails', () => {
  let store: MockStoreEnhanced;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should show spinner when loading', () => {
    (useSearchCardQuery as vi.Mock).mockReturnValue({
      data: null,
      isError: false,
      isLoading: true
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/card/1']}>
          <Routes>
            <Route
              path="/card/:id"
              element={<CardDetails />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show character details when data is fetched successfully', async () => {
    (useSearchCardQuery as vi.Mock).mockReturnValue({
      data: mockCharacter,
      isError: false,
      isLoading: false
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/card/1']}>
          <Routes>
            <Route
              path="/card/:id"
              element={<CardDetails />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => expect(screen.getByText('Rick Sanchez')).toBeInTheDocument());
    expect(screen.getByText('Status: Alive')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Species: Human')).toBeInTheDocument();
    expect(screen.getByText('Location: Citadel of Ricks')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute('src', mockCharacter.image);
  });

  it('should show not found section when there is an error', () => {
    (useSearchCardQuery as vi.Mock).mockReturnValue({
      data: null,
      isError: true,
      isLoading: false
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/card/1']}>
          <Routes>
            <Route
              path="/card/:id"
              element={<CardDetails />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Nothing Not Found')).toBeInTheDocument();
  });

  it('should navigate back when close button is clicked', () => {
    (useSearchCardQuery as vi.Mock).mockReturnValue({
      data: mockCharacter,
      isError: false,
      isLoading: false
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/card/1']}>
          <Routes>
            <Route
              path="/card/:id"
              element={<CardDetails />}
            />
            <Route
              path="/"
              element={<div>Home Page</div>}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(container.innerHTML).toContain('Home Page');
  });
});
