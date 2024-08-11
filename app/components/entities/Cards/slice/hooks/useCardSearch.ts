import { useSearchParams } from '@remix-run/react';
import { DEFAULT_PAGE } from '@shared/constants/constats';

const useCardSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const details = searchParams.get('details');

  const getAllCards = (text: string) => {
    setSearchParams({ page: String(DEFAULT_PAGE), query: text, ...(details && { details }) });
  };

  return { getAllCards };
};

export default useCardSearch;
