import useAppDispatch from '@/app/store/hooks/useAppDispatch';
import { DEFAULT_PAGE, LOCAL_STORAGE_KEY } from '@/shared/constants/constats';
import { UseLocalStorage } from '@/shared/lib';
import { useSearchParams } from 'react-router-dom';
import { setCurrentPage, setSaveText } from '../search.slice';

const useCardSearch = () => {
  const useLocalStorage = UseLocalStorage();

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const getAllCards = (res: string) => {
    useLocalStorage.set(LOCAL_STORAGE_KEY, res);

    if (searchParams.has('page')) {
      setSearchParams({ page: String(DEFAULT_PAGE) });
    }

    dispatch(setSaveText(res.trim()));
    dispatch(setCurrentPage(DEFAULT_PAGE));
  };

  return { getAllCards };
};

export default useCardSearch;
