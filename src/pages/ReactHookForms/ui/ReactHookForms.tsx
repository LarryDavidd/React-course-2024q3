import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ageValidationSchema, emailValidationSchema, nameValidationSchema, passwordValidationSchema } from '@shared/validate/validationShemas';
import { fillFormState, FormData } from '../model';
import { CONTACT_INPUT_FIELDS, PASSWORD_INPUT_FIELDS } from '@/shared/constants/constats';

const ReactHookForm = () => {
  const validationSchema = yup.object({
    name: nameValidationSchema,
    email: emailValidationSchema,
    age: ageValidationSchema,
    password: passwordValidationSchema.fields.password as yup.StringSchema,
    confirmPassword: passwordValidationSchema.fields.confirmPassword as yup.StringSchema
  });

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'all'
  });

  const onSubmit = (data: FormData | fillFormState) => {
    const fillForm = {
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    };

    console.log(fillForm);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {CONTACT_INPUT_FIELDS.map(({ type, inputName, placeholder }, i) => (
        <div key={i}>
          <input
            type={type}
            placeholder={placeholder}
            {...register(inputName as keyof FormData)}
          />
          <div>{errors[inputName as keyof FormData]?.message}</div>
        </div>
      ))}
      {PASSWORD_INPUT_FIELDS.map(({ type, inputName, placeholder }, i) => (
        <div key={i}>
          <input
            type={type}
            placeholder={placeholder}
            {...register(inputName as keyof FormData)}
          />
          <div>{errors[inputName as keyof FormData]?.message}</div>
        </div>
      ))}
      <button>submit</button>
    </form>
  );
};

export default ReactHookForm;
