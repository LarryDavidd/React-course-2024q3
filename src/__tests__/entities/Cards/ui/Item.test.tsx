import { render, screen } from '@testing-library/react';
import { IResponse } from '@shared/types/types';
import { describe, it, expect } from 'vitest';
import { Item } from '@entities/Cards';
import '@testing-library/jest-dom';

const mockCharacter: IResponse = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  location: {
    name: 'Citadel of Ricks'
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
};

describe('Item Component', () => {
  it('should render character details correctly', () => {
    render(<Item character={mockCharacter} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();

    expect(screen.getByText('Status: Alive')).toBeInTheDocument();

    expect(screen.getByText('Gender: Male')).toBeInTheDocument();

    expect(screen.getByText('Species: Human')).toBeInTheDocument();

    expect(screen.getByText('Location: Citadel of Ricks')).toBeInTheDocument();

    const imgElement = screen.getByAltText('Rick Sanchez') as HTMLImageElement;
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toBe(mockCharacter.image);
  });
});
