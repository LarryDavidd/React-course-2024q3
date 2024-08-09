import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import BaseInput, { InputDetails } from '@/components/shared/ui-kits/input/BaseInput/BaseInput';

describe('BaseInput', () => {
  it('renders input with correct default values', () => {
    const handleChange = vi.fn();
    render(
      <BaseInput
        onChange={handleChange}
        inputDetails={{}}
      />
    );

    const inputElement = screen.getByPlaceholderText('text...');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('id', 'default-search');
    expect(inputElement).not.toBeRequired();
  });

  it('renders input with provided values', () => {
    const handleChange = vi.fn();
    const inputDetails: InputDetails = {
      id: 'test-id',
      placeholder: 'Enter text',
      type: 'email',
      required: true,
      value: 'test@example.com'
    };
    render(
      <BaseInput
        onChange={handleChange}
        inputDetails={inputDetails}
      />
    );

    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'email');
    expect(inputElement).toHaveAttribute('id', 'test-id');
    expect(inputElement).toBeRequired();
    expect(inputElement).toHaveValue('test@example.com');
  });

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(
      <BaseInput
        onChange={handleChange}
        inputDetails={{}}
      />
    );

    const inputElement = screen.getByPlaceholderText('text...');
    fireEvent.change(inputElement, { target: { value: 'new text' } });
    expect(handleChange).toHaveBeenCalledWith('new text');
  });

  it('renders input with disabled attribute when disabled is true', () => {
    const handleChange = vi.fn();
    const inputDetails = {
      disabled: true
    };
    render(
      <BaseInput
        onChange={handleChange}
        inputDetails={inputDetails}
      />
    );

    const inputElement = screen.getByPlaceholderText('text...');
    expect(inputElement).toBeDisabled();
  });
});
