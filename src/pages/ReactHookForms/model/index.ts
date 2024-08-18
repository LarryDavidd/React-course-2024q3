export type fillFormState = {
  name: string;
  age: string | number;
  email: string;
  password: string;
  confirmPassword: string;
  gender?: string | undefined;
};

export interface FormData {
  name?: string | undefined;
  age?: number | undefined;
  email?: string | undefined;
  password?: string | undefined;
  confirmPassword?: string | undefined;
  gender?: string | undefined;
}
