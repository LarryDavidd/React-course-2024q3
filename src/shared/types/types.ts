export type IResponse = {
  id: number;
  name: string;
  status: string;
  gender: string;
  image: string;
  species: string;
  location: {
    name: string;
  };
};

export type IResult = {
  results: IResponse[];
};
