import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  acceptHookValidationSchema,
  ageValidationSchema,
  countryValidationSchema,
  emailValidationSchema,
  imageHookValidationSchema,
  nameValidationSchema,
  passwordValidationSchema,
  requiredFieldValidationSchema
} from '@shared/validate/validationShemas';
import { fillFormState, FormData } from '../model';
import { CONTACT_INPUT_FIELDS, COUNTRIES, GENDER_TYPE, PASSWORD_INPUT_FIELDS } from '@/shared/constants/constats';

const ReactHookForm = () => {
  const validationSchema = yup.object({
    name: nameValidationSchema,
    email: emailValidationSchema,
    age: ageValidationSchema,
    password: passwordValidationSchema.fields.password as yup.StringSchema,
    confirmPassword: passwordValidationSchema.fields.confirmPassword as yup.StringSchema,
    gender: requiredFieldValidationSchema,
    accept: acceptHookValidationSchema,
    country: countryValidationSchema,
    image: imageHookValidationSchema
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
      confirmPassword: data.confirmPassword,
      gender: data.gender,
      accept: data.accept,
      image: data.image,
      country: data.country
    };

    console.log(fillForm, data.image);
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
      {GENDER_TYPE.map((gender) => (
        <label key={gender}>
          <input
            type="radio"
            name="gender"
            defaultValue={gender}
            {...(register ? { ...register('gender' as keyof FormData) } : '')}
          />
          {gender}
        </label>
      ))}
      <div>
        <label>
          <input
            type="checkbox"
            {...(register ? { ...register('accept' as keyof FormData) } : '')}
          />
          I accept the Terms and Conditions
        </label>
        <div>{errors.accept?.message}</div>
      </div>
      <div>
        <input
          {...register('image')}
          type="file"
          accept="image/png, image/jpeg"
          id="fileInput"
        />
        <label>Choose a file</label>
        <div>{errors.image?.message}</div>
      </div>
      <div>
        <input
          {...register('country')}
          placeholder="Enter Country"
          type="text"
          id="country"
          list="countryList"
        />
        <div>{errors.country?.message}</div>
        <datalist id="countryList">
          {COUNTRIES.map((country: string) => (
            <option
              aria-hidden="true"
              key={country}
              value={country}
            />
          ))}
        </datalist>
      </div>
      <button>submit</button>
    </form>
  );
};

export default ReactHookForm;
