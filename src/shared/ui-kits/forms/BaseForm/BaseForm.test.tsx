import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import Form from './BaseForm';

describe('Form', () => {
  it('renders form with children', () => {
    render(
      <Form onSubmit={() => {}}>
        <button type="submit">Submit</button>
      </Form>
    );
    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', () => {
    const handleSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    });
    render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );
    const formElement = screen.getByRole('form');
    fireEvent.submit(formElement);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('prevents default form submission', () => {
    const handleSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    });
    render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );
    const formElement = screen.getByRole('form');
    fireEvent.submit(formElement);
    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmit.mock.calls[0][0].defaultPrevented).toBe(true);
  });
});
