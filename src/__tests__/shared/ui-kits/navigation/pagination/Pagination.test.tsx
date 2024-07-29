import { Pagination } from '@/shared/ui-kits/navigation';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Pagination component', () => {
  it('should display the current page', () => {
    render(
      <Pagination
        currentPage={5}
        onClick={vi.fn()}
      />
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should call onClick with the previous page number when "Previous" is clicked', () => {
    const onClickMock = vi.fn();
    render(
      <Pagination
        currentPage={5}
        onClick={onClickMock}
      />
    );

    fireEvent.click(screen.getByText('Previous'));
    expect(onClickMock).toHaveBeenCalledWith(4);
  });

  it('should call onClick with the next page number when "Next" is clicked', () => {
    const onClickMock = vi.fn();
    render(
      <Pagination
        currentPage={5}
        onClick={onClickMock}
      />
    );

    fireEvent.click(screen.getByText('Next'));
    expect(onClickMock).toHaveBeenCalledWith(6);
  });

  it('should not call onClick when "Previous" is clicked on the first page', () => {
    const onClickMock = vi.fn();
    render(
      <Pagination
        currentPage={1}
        onClick={onClickMock}
      />
    );

    fireEvent.click(screen.getByText('Previous'));
    expect(onClickMock).toHaveBeenCalledWith(0);
  });
});
