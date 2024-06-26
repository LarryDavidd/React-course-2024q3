import React, { Component } from 'react';

type ButtonProps = {
  onClick: (text: string) => void;
  buttonDetails: ButtonDetailes;
};

type ButtonDetailes = {
  name: string;
  type?: 'button' | 'reset' | 'submit';
  isLoading?: boolean;
  isDisabled?: boolean;
};

class SimpleButton extends Component<ButtonProps> {
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onClick(event.target.value);
  };

  render() {
    return (
      <button
        type={this.props.buttonDetails.type ?? 'button'}
        className="mb-2 me-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800"
        disabled={this.props.buttonDetails.isDisabled ?? false}
      >
        {this.props.buttonDetails.name}
      </button>
    );
  }
}

export default SimpleButton;
