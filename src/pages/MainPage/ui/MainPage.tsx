import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface FormData {
  name?: string | undefined;
}

const nameValidationSchema = yup
  .string()
  .required('Name is required')
  .matches(/^[A-Z].*$/, 'Name should starts with an uppercase letter');

export const INPUT_FIELDS = [
  {
    type: 'text',
    placeholder: 'Enter Name',
    inputName: 'name'
  }
];

export type fillFormState = {
  name: string;
};

const MainPage: React.FC = () => {
  const validationSchema = yup.object({
    name: nameValidationSchema
  });

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'all'
  });

  const onSubmit = (data: fillFormState) => {
    const fillForm = {
      name: data.name
    };

    console.log(fillForm);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <input
        type={INPUT_FIELDS[0].type}
        placeholder={INPUT_FIELDS[0].placeholder}
        {...register(INPUT_FIELDS[0].inputName as keyof FormData)}
      />
      <div>{errors.name?.message}</div>
      <button>submit</button>
    </form>
  );
};

export default MainPage;
