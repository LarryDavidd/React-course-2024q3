import * as yup from 'yup';
import { COUNTRIES } from '../constants/constats';

export const nameValidationSchema = yup
  .string()
  .required('Name is required')
  .matches(/^[A-Z].*$/, 'Name should start with an uppercase letter');

export const emailValidationSchema = yup
  .string()
  .required('Email is required')
  .matches(/^\S*$/, 'Email must be valid (example@mail.com)')
  .test('email-tld', 'Email must be valid (example@mail.com)', (value) => {
    if (!value) {
      return false;
    }
    const parts = value.split('@');
    if (parts.length !== 2) {
      return false;
    }

    const domain = parts[1].trim();
    const domainParts = domain.split('.');

    return domainParts.length >= 2 && domainParts.every((part) => part.trim() !== '');
  });

export const ageValidationSchema = yup
  .number()
  .transform((originalValue) => {
    const value = Number(originalValue);
    return Number.isNaN(value) ? null : value;
  })
  .nullable()
  .required('Age is required')
  .positive('Age should be > 0');

export const passwordValidationSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .matches(/^\S*$/, 'This field must not contain spaces')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match')
});

export const requiredFieldValidationSchema: yup.StringSchema = yup.string().required('This field is required');

export const acceptHookValidationSchema = yup.boolean().oneOf([true], 'This field is required').required('This field is required');

export const imageHookValidationSchema = yup
  .mixed<FileList>()
  .test('File presence', 'Image is required', (value) => !!(value as FileList)[0])
  .test('Image extension', 'file should be jpeg or png', (value) => {
    if (value) {
      const extension = (value as FileList)[0]?.name.slice((value as FileList)[0].name.lastIndexOf('.'));
      return ['.jpeg', '.jpg', '.png'].includes(extension);
    }
    return false;
  });

export const countryValidationSchema: yup.StringSchema = yup.string().required('Choose country').oneOf(COUNTRIES, 'Choose country');
