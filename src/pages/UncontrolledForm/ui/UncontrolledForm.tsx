import { MainHeader } from '@/widgets/MainHeader';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import useAppSelector from '@/app/store/hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
import { setReactHookForm } from '@/entities/CardsFromForm/slice/forms.slice';
import { fillFormState } from '@/pages/ReactHookForms/model';

interface FormData {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  accept: boolean;
  picture: File | null;
  country: string;
}

interface FormErrors {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  accept?: string;
  picture?: string;
  country?: string;
}

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useAppSelector((state) => state.countrySlice);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    accept: false,
    picture: null,
    country: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!/^[A-Z]/.test(formData.name)) {
      errors.name = 'Name should start with an uppercase letter.';
    }

    if (!/^\d+$/.test(formData.age) || parseInt(formData.age, 10) <= 0) {
      errors.age = 'Age should be a positive number.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email address.';
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      errors.password = 'Password should be at least 8 characters and include 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (formData.picture) {
      const file = formData.picture;
      if (file.size > 2 * 1024 * 1024) {
        errors.picture = 'File size should be less than 2MB.';
      }
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        errors.picture = 'Only PNG and JPEG files are allowed.';
      }
    }

    if (!formData.gender) {
      errors.gender = 'Please select your gender.';
    }

    if (!formData.accept) {
      errors.accept = 'You must accept the Terms and Conditions.';
    }

    if (!formData.country) {
      errors.country = 'Please select your country.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      if (formData.picture) {
        const reader = new FileReader();
        reader.onloadend = () => {
          dispatch({ type: 'SAVE_PICTURE', payload: reader.result as string });
        };
        reader.readAsDataURL(formData.picture);
        const { picture, ...formDataWithoutImage } = formData;
        if (picture)
          dispatch(
            setReactHookForm({
              newForm: { ...formDataWithoutImage, ['image']: submitedFile } as fillFormState
            })
          );
        navigate('/');
      }
    }
  };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData((prevState) => ({
        ...prevState,
        [name]: target.checked
      }));
    } else if (type === 'file') {
      onFileSubmit(e as React.ChangeEvent<HTMLInputElement>);
      const target = e.target as HTMLInputElement;
      setFormData((prevState) => ({
        ...prevState,
        [name]: target.files ? target.files[0] : null
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleCountrySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, country: e.target.value }));
  };

  return (
    <>
      <MainHeader />
      <div>
        <form
          onSubmit={handleSubmit}
          className="m-auto w-min"
        >
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <p>{errors.age}</p>}
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          </div>

          <div>
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p>{errors.gender}</p>}
          </div>

          <div>
            <input
              placeholder="Enter Country"
              type="text"
              id="country"
              list="countryList"
              onChange={(e) => handleCountrySelect(e)}
            />
            <datalist id="countryList">
              {countries.map((country: string) => (
                <option
                  aria-hidden="true"
                  key={country}
                  value={country}
                />
              ))}
            </datalist>
            {errors.country && <p>{errors.country}</p>}
          </div>

          <div>
            <label htmlFor="picture">Upload Picture:</label>
            <input
              type="file"
              id="picture"
              name="picture"
              accept="image/png, image/jpeg"
              onChange={handleChange}
            />
            {errors.picture && <p>{errors.picture}</p>}
          </div>

          <div>
            <label htmlFor="accept">
              <input
                type="checkbox"
                id="accept"
                name="accept"
                checked={formData.accept}
                onChange={handleChange}
              />
              I accept the Terms and Conditions
            </label>
            {errors.accept && <p>{errors.accept}</p>}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default UncontrolledForm;
