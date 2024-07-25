import useAppDispatch from '@/app/store/hooks/useAppDispatch';
import { DEFAULT_PAGE, LOCAL_STORAGE_KEY } from '@/shared/constants/constats';
import { UseLocalStorage } from '@/shared/lib';
import { useSearchParams } from 'react-router-dom';
import { setSaveText } from '../search.slice';

const useCardSearch = (res: string) => {
  const { setInitSearchParams } = useStartedSearchParams();
  const useLocalStorage = UseLocalStorage();
  const dispatch = useAppDispatch();
  const getAllCards = () => {
    useLocalStorage.set(LOCAL_STORAGE_KEY, res);
    setInitSearchParams();
    dispatch(setSaveText({ key: 'inputValue', value: res.trim() }));
    dispatch(setSaveText({ key: 'currentPage', value: DEFAULT_PAGE }));
  };

  return { getAllCards };
};

export default useCardSearch;

const useStartedSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') as string;

  const setInitSearchParams = () => {
    if (searchParams.has('page')) {
      setSearchParams({ page: String(DEFAULT_PAGE) });
    }
  };
  return { page, setInitSearchParams };
};
