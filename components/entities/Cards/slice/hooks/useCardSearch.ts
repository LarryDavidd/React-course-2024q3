import { DEFAULT_PAGE } from '@/components/shared/constants/constats';
import { useRouter } from 'next/router';

const useCardSearch = () => {
  const router = useRouter();

  const getAllCards = (res: string) => {
    const query = {
      ...router.query,
      page: DEFAULT_PAGE,
      value: res.trim()
    };
    router.push({
      pathname: router.pathname,
      query
    });
  };

  return { getAllCards };
};

export default useCardSearch;
