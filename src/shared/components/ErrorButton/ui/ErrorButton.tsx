import React, { useState } from 'react';
import { SimpleButton } from '@shared/ui-kits/buttons';

const ErrorButton: React.FC = () => {
  const [isError, setIsError] = useState(false);

  const throwError = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('Something went wrong!');
  }

  return (
    <SimpleButton
      onClick={throwError}
      buttonDetails={{ name: 'Error' }}
    />
  );
};

export default ErrorButton;
