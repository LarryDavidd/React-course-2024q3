import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, test, vi } from 'vitest';
import SimpleButton, { ButtonDetails } from '@shared/ui-kits/buttons/SimpleButton/SimpleButton';

describe('SimpleButton', () => {
  const buttonDetails: ButtonDetails = {
    name: 'Click Me',
    type: 'button',
    isDisabled: false
  };

  test('renders button with correct name', () => {
    render(<SimpleButton buttonDetails={buttonDetails} />);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', () => {
    const handleClick = vi.fn();
    render(
      <SimpleButton
        onClick={handleClick}
        buttonDetails={buttonDetails}
      />
    );
    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('button is disabled when isDisabled is true', () => {
    const disabledButtonDetails = { ...buttonDetails, isDisabled: true };
    render(<SimpleButton buttonDetails={disabledButtonDetails} />);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeDisabled();
  });

  it('button has correct type', () => {
    render(<SimpleButton buttonDetails={buttonDetails} />);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  it('button uses default type when not specified', () => {
    const noTypeButtonDetails = { ...buttonDetails, type: undefined };
    render(<SimpleButton buttonDetails={noTypeButtonDetails} />);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toHaveAttribute('type', 'button');
  });
});
