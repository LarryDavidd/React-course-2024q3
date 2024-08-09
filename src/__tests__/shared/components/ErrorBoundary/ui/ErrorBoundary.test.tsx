import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import ErrorBoundary from '@/components/shared/components/ErrorBoundary/ui/ErrorBoundary';

vi.mock('../components/ErrorBlock', () => ({
  __esModule: true,
  default: () => <div>Something went wrong</div>
}));

describe('ErrorBoundary', () => {
  it('renders children without error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders ErrorBlock on error', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something's missing.")).toBeInTheDocument();
  });
});
