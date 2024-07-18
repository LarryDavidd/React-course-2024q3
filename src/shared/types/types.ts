export interface IResponse {
  id: number;
  name: string;
  status: string;
  gender: string;
  image: string;
  species: string;
  location: {
    name: string;
  };
}

export interface IResult {
  results: IResponse[];
  info: {
    pages: number;
  };
}

export interface ISingleResult {
  results: IResponse;
}
