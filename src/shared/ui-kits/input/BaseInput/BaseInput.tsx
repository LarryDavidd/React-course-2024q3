import React, { Component } from 'react';

type InputProps = {
  onChange: (text: string) => void;
  inputDetails: InputDetails;
};

type InputDetails = {
  id?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'phone' | 'email' | 'number' | 'search';
  error?: string[] | null;
  required?: boolean;
  disabled?: boolean;
  value?: string;
};

class BaseInput extends Component<InputProps> {
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <input
        id={this.props.inputDetails.id ?? 'default-search'}
        type={this.props.inputDetails.type ?? 'text'}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder={this.props.inputDetails.placeholder ?? 'text...'}
        required={this.props.inputDetails.required ?? false}
        value={this.props.inputDetails.value ?? ''}
        onChange={this.handleInputChange}
      />
    );
  }
}

export default BaseInput;
