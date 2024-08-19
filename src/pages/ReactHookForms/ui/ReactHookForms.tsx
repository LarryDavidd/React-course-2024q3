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
import { CONTACT_INPUT_FIELDS, GENDER_TYPE, PASSWORD_INPUT_FIELDS } from '@/shared/constants/constats';
import { MainHeader } from '@/widgets/MainHeader';
import useAppDispatch from '@/app/store/hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { setReactHookForm } from '@/entities/CardsFromForm/slice/forms.slice';
import { ChangeEvent, useState } from 'react';
import useAppSelector from '@/app/store/hooks/useAppSelector';

const ReactHookForm = () => {
  const countries = useAppSelector((state) => state.countrySlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [submitedFile, setSubmitedFile] = useState('');

  const onFileSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFile = files && files.length > 0 ? files[0] : null;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setSubmitedFile(base64);
    };

    if (selectedFile) reader.readAsDataURL(selectedFile);
  };

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
    register,
    reset
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
      image: submitedFile,
      country: data.country
    };

    dispatch(
      setReactHookForm({
        newForm: fillForm as fillFormState
      })
    );
    reset();
    navigate('/');
  };

  return (
    <>
      <MainHeader />
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="m-auto w-min"
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
        <div>
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
          <div>{errors['gender' as keyof FormData]?.message}</div>
        </div>
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
            onChange={onFileSubmit}
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
            {countries.map((country: string) => (
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
    </>
  );
};

export default ReactHookForm;
