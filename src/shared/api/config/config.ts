const env = import.meta.env;

const baseUrl = env.REACT_BASE_API_URL || 'https://rickandmortyapi.com/api/character';

export const config = {
  baseUrl
};
