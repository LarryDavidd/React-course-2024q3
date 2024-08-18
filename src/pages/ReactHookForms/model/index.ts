export type ImageInfoType = {
  imageInfo: { size: number; name: string } | null;
  base64: string | null;
};

export type fillFormState = {
  name: string;
  age: string | number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  accept: boolean;
  image: ImageInfoType;
};

export interface FormData {
  name?: string | undefined;
  age?: number | undefined;
  email?: string | undefined;
  password?: string | undefined;
  confirmPassword?: string | undefined;
  gender?: string | undefined;
  accept?: boolean | undefined;
  image?: FileList | undefined;
}
