import React from 'react';

export type InputProps = {
  onChange: (text: string) => void;
  inputDetails: InputDetails;
};

export type InputDetails = {
  id?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'phone' | 'email' | 'number' | 'search';
  error?: string[] | null;
  required?: boolean;
  disabled?: boolean;
  value?: string;
};

const BaseInput: React.FC<InputProps> = ({ onChange, inputDetails }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      id={inputDetails.id ?? 'default-search'}
      type={inputDetails.type ?? 'text'}
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      placeholder={inputDetails.placeholder ?? 'text...'}
      required={inputDetails.required ?? false}
      value={inputDetails.value}
      disabled={inputDetails.disabled}
      onChange={handleInputChange}
    />
  );
};

export default BaseInput;
