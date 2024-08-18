export const DEFAULT_PAGE = 1;

export const LOCAL_STORAGE_KEY = 'searchRequest';

export const CONTACT_INPUT_FIELDS = [
  {
    type: 'text',
    placeholder: 'Enter Name',
    inputName: 'name'
  },
  {
    type: 'text',
    placeholder: 'Enter Email',
    inputName: 'email'
  },
  {
    type: 'number',
    placeholder: 'Enter Age',
    inputName: 'age',
    min: 1
  }
];

export const PASSWORD_INPUT_FIELDS = [
  {
    type: 'password',
    placeholder: 'Enter Password',
    inputName: 'password'
  },
  {
    type: 'password',
    placeholder: 'Confirm Password',
    inputName: 'confirmPassword'
  }
];

export const GENDER_TYPE = ['Male', 'Female'];
