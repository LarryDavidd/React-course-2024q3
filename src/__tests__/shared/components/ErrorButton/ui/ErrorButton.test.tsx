import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorButton from '@shared/components/ErrorButton/ui/ErrorButton';
import { describe, expect, it } from 'vitest';

describe('ErrorButton', () => {
  it('should render the button', () => {
    render(<ErrorButton />);
    const button = screen.getByRole('button', { name: /Error/i });
    expect(button).toBeInTheDocument();
  });

  it('should throw an error when clicked', () => {
    render(<ErrorButton />);
    const button = screen.getByRole('button', { name: /Error/i });

    expect(() => {
      fireEvent.click(button);
    }).toThrow('Something went wrong!');
  });
});
