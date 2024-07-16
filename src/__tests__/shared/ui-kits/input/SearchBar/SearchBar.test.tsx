import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import SearchBar from '@shared/ui-kits/input/SearchBar/SearchBar';
import { ButtonProps } from '@shared/ui-kits/buttons/SimpleButton/SimpleButton';
import { InputProps } from '@shared/ui-kits/input/BaseInput/BaseInput';
import { FormProps } from 'react-router-dom';

vi.mock('@shared/ui-kits/input', () => ({
  BaseInput: ({ onChange, inputDetails }: InputProps) => (
    <input
      type={inputDetails.type || 'text'}
      placeholder={inputDetails.placeholder || 'text...'}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  )
}));

vi.mock('@shared/ui-kits/buttons', () => ({
  SimpleButton: ({ onClick, buttonDetails }: ButtonProps) => (
    <button
      type="button"
      onClick={onClick}
    >
      {buttonDetails.name}
    </button>
  )
}));

vi.mock('@shared/ui-kits/forms', () => ({
  BaseForm: ({ onSubmit, children }: FormProps) => (
    <form
      role="form"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  )
}));

describe('SearchBar', () => {
  it('renders search bar with input and button', () => {
    render(<SearchBar onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText('text...');
    const buttonElement = screen.getByRole('button', { name: /search/i });
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<SearchBar onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText('text...');
    fireEvent.change(inputElement, { target: { value: 'new query' } });
    expect(inputElement).toHaveValue('new query');
  });

  it('calls onSearch with query when form is submitted', () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} />);
    const inputElement = screen.getByPlaceholderText('text...');
    const formElement = screen.getByRole('form');

    fireEvent.change(inputElement, { target: { value: 'new query' } });
    fireEvent.submit(formElement);

    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith('new query');
  });
});
