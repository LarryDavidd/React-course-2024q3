import React, { FC, ReactNode } from 'react';

type FormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

const Form: FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form
      role="form"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
