import { DEFAULT_PAGE } from '@shared/constants/constats';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useCardSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getAllCards = (res: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(DEFAULT_PAGE));
    params.set('value', res.trim());

    router.push(pathname + '?' + params.toString());
  };

  return { getAllCards };
};

export default useCardSearch;
